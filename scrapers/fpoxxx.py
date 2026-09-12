"""fpo.xxx -- server-rendered KVS-family tube site, video_url embedded plainly.

Search is a normal HTML page (``www.fpo.xxx/search/<query>/``); the bare
``fpo.xxx`` host 301s to ``www.`` on every request, so the scraper talks to
``www.`` directly rather than paying that redirect on every call.

The video page is a "KT Player" (Kernel Video Sharing) template: the playable
URL sits in a plain, unobfuscated ``flashvars`` object as ``video_url`` --
already signed with a short-lived ``v-acctoken`` query parameter. No JS to
run, no fragments to reassemble (contrast ``iporntv.py``, a different tube CMS
that deliberately shreds the same kind of URL across dozens of script
variables). Only one quality is offered per video; there is no ``video_alt_url``
on this template the way some KT Player deployments have one.
"""

import re
from urllib.parse import quote, urljoin

from lxml import html as lxml_html

from tubescraper_addon.scraper_api.base import (
    DirectScraper,
    DirectSource,
    DirectVideo,
    parse_count,
    parse_duration,
)


_VIDEO_ID_RE = re.compile(r"/video/(\d+)/")
_VIDEO_URL_RE = re.compile(r"video_url:\s*'([^']+)'")


class FPOXXXScraper(DirectScraper):
    key = "fpoxxx"
    name = "FPO.XXX"
    base_url = "https://www.fpo.xxx"

    def search(self, query: str, limit: int = 20) -> list[DirectVideo]:
        # The search term is a path segment, not a query string, on this
        # template -- quote it ourselves rather than pass a `params` dict.
        response = self._get(f"{self.base_url}/search/{quote(query)}/")
        tree = lxml_html.fromstring(response.text)

        videos: list[DirectVideo] = []
        for item in tree.xpath("//div[contains(concat(' ', normalize-space(@class), ' '), ' item ')]"):
            links = item.xpath(".//a[@href]")
            if not links:
                continue
            link = links[0]
            href = link.get("href") or ""

            match = _VIDEO_ID_RE.search(href)
            if not match:
                # Every real video card links to /video/<id>/<slug>/. Anything
                # else on this template is a promo tile, not a result.
                continue
            video_id = match.group(1)

            image = item.xpath(".//img")
            thumbnail = image[0].get("data-original") if image else None

            duration = item.xpath(
                ".//*[contains(concat(' ', normalize-space(@class), ' '), ' duration ')]"
            )
            views = item.xpath(
                ".//*[contains(concat(' ', normalize-space(@class), ' '), ' views ')]"
            )

            videos.append(
                DirectVideo(
                    site=self.key,
                    video_id=video_id,
                    title=(link.get("title") or link.text_content()).strip()
                    or "Untitled",
                    page_url=urljoin(self.base_url, href),
                    thumbnail=thumbnail or None,
                    duration=parse_duration(
                        duration[0].text_content() if duration else None
                    ),
                    views=parse_count(views[0].text_content() if views else None),
                )
            )
            if len(videos) >= limit:
                break

        return videos

    def resolve(self, video_id: str) -> list[DirectSource]:
        response = self._get(f"{self.base_url}/video/{video_id}/-")

        match = _VIDEO_URL_RE.search(response.text)
        if not match:
            return []

        # A gated rendition is substituted rather than omitted -- the player
        # block still carries a ``video_url``, pointing at the login page.
        # Only the ``/get_file/`` handler serves media here, so anything else
        # is the gate, and returning nothing says so honestly instead of
        # handing the player an HTML document labelled video/mp4.
        if "/get_file/" not in match.group(1):
            return []

        return [
            DirectSource(
                url=match.group(1),
                label="Video",
                mime_type="video/mp4",
                headers={"Referer": self.base_url + "/"},
            )
        ]
