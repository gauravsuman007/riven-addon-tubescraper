"""Cloudflare clearance for scrapers whose *page* is behind a managed challenge.

``curl_cffi`` impersonation (see ``noodlemagazine.py``) clears sites that only
check the TLS fingerprint. A **managed challenge** (xfreehd's "Just a moment…")
is different: it 403s every impersonation profile, from a residential address
and from the server alike, and only a real browser engine passes it. That is
FlareSolverr's job, so this module hands the solve to one the deployment
provides -- its URL is a setting (``flaresolverr_url``), never hard-coded, and
nothing is attempted when it is empty.

How it is used, and why it is cheap enough to be a default:

* A solve takes ~12 s, so it happens **once per host** and the resulting
  ``cf_clearance`` cookie and User-Agent are cached for twenty minutes. Every
  later request is a plain ``self.session`` request carrying that cookie and
  that UA, at normal speed. (Measured: ``requests`` with the cookie and the
  solver's UA gets 200; ``curl_cffi`` with its own Chrome UA and the same
  cookie gets 403 -- the clearance is bound to the UA it was issued for, so
  the UA is applied to the session along with the cookie.)
* It is **not** a way round the VPN: FlareSolverr's own traffic goes out its
  own address, and ``cf_clearance`` is tied to the address that solved. With a
  scraper VPN route enabled the cookie may be rejected; the 403 retry then
  re-solves once and, if that also fails, raises -- failing loudly rather than
  looking like an empty result (see AGENTS.md).
* When no solver is configured the error says so, instead of a bare 403.

Only the page needs this on xfreehd; its media host (``lb.xfreehd.com``)
answers without cookie or UA, so the clearance never has to travel with a
``DirectSource``.
"""

import threading
import time
from urllib.parse import urlparse

import requests
from loguru import logger


_TTL = 20 * 60
_SOLVE_TIMEOUT_MS = 60_000

_cache: dict[str, tuple[float, dict[str, str], str]] = {}
_lock = threading.Lock()


class SolverError(RuntimeError):
    """The challenge could not be cleared -- distinct from "no results"."""


def _endpoint() -> str:
    from tubescraper_addon import config

    return config.settings().flaresolverr_url.strip().rstrip("/")


def clearance(url: str, force: bool = False) -> tuple[dict[str, str], str]:
    """Cookies and User-Agent that clear ``url``'s host, solving if needed."""

    parts = urlparse(url)
    host = parts.netloc

    # One solve at a time: the solver is a single headless browser, and two
    # threads asking for the same host should share one answer, not race.
    with _lock:
        hit = _cache.get(host)
        if hit and not force and time.monotonic() - hit[0] < _TTL:
            return hit[1], hit[2]

        endpoint = _endpoint()
        if not endpoint:
            raise SolverError(
                f"{host} is behind a Cloudflare challenge; set 'FlareSolverr "
                "URL' in this add-on's settings to read it"
            )

        try:
            reply = requests.post(
                f"{endpoint}/v1",
                json={
                    "cmd": "request.get",
                    # The page actually wanted, not the site's front page:
                    # xfreehd challenges ``/search`` but not ``/``, and the
                    # solver reports "Challenge not detected" (no cookie) for
                    # an unchallenged URL.
                    "url": url,
                    "maxTimeout": _SOLVE_TIMEOUT_MS,
                },
                timeout=_SOLVE_TIMEOUT_MS / 1000 + 30,
            ).json()
        except (requests.RequestException, ValueError) as exc:
            raise SolverError(f"FlareSolverr at {endpoint} did not answer: {exc}")

        solution = reply.get("solution") or {}
        cookies = {c["name"]: c["value"] for c in solution.get("cookies", [])}
        if reply.get("status") != "ok" or not solution.get("cookies"):
            raise SolverError(
                f"FlareSolverr could not clear {host}: {reply.get('message', reply)}"
            )

        agent = solution.get("userAgent") or ""
        _cache[host] = (time.monotonic(), cookies, agent)
        logger.debug(f"solver: cleared {host}")
        return cookies, agent


def _apply(session: requests.Session, url: str, cookies: dict[str, str], agent: str):
    host = urlparse(url).hostname or ""
    for name, value in cookies.items():
        session.cookies.set(name, value, domain=host)
    if agent:
        session.headers["User-Agent"] = agent


def solved_get(scraper, url: str, **kwargs) -> requests.Response:
    """``scraper._get`` with the host's clearance applied to its session."""

    full = requests.Request("GET", url, params=kwargs.get("params")).prepare().url
    _apply(scraper.session, url, *clearance(full))
    try:
        return scraper._get(url, **kwargs)
    except requests.HTTPError as exc:
        # A clearance can lapse early (the site rotates it, or the solver's
        # address changed). Re-solve once; a second 403 is a real failure.
        if exc.response is None or exc.response.status_code != 403:
            raise
        _apply(scraper.session, url, *clearance(full, force=True))
        return scraper._get(url, **kwargs)
