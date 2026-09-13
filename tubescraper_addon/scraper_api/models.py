"""What a direct-site scraper hands back.

These sites are not indexers: there is no infohash, no swarm and no debrid
step. A result is a page on a streaming site, and playing it means resolving
that page down to an actual media URL.

The two halves are deliberately separate. Search results are cheap, cacheable
and safe to show in bulk; a resolved source is expensive to obtain, usually
short-lived, and on some sites is bound to the IP that requested it. Resolving
at search time would mean every link in the grid had expired by the time the
user clicked one.
"""

from dataclasses import dataclass, field, replace


@dataclass(frozen=True, slots=True)
class DirectVideo:
    """One video as a site's search results described it."""

    site: str
    """Scraper key, e.g. ``xfreehd``. Also what /resolve is keyed on."""
    video_id: str
    title: str
    page_url: str
    thumbnail: str | None = None
    duration: int | None = None
    """Runtime in seconds. ``None`` when the site did not say."""
    resolution: str | None = None
    """Normalised, e.g. ``1080p``. ``None`` rather than a guess -- most sites
    only expose the real figure on the video page, and claiming "HD" means
    anything from 720p to 4K."""
    size: int | None = None
    """Size in bytes of the best source, when the site reports it up front."""
    views: int | None = None
    hd: bool = False
    """The site showed an HD badge. Kept separate from ``resolution`` because
    it is a claim rather than a measurement -- the same badge covers 720p and
    4K -- but it still orders a result above one with no quality signal."""
    description: str | None = None
    """The site's own paragraph about this video, when it writes one. Very few
    do: of the archives measured, one in seven. ``None`` means "not known",
    which includes "not fetched yet" -- a card is built from a grid page and
    the text usually lives on the video's own page."""
    posted_at: str | None = None
    """As the site stated it, verbatim -- "6 days ago", "11 months ago", a
    date. NOT parsed into a timestamp: these sites use relative wording and
    resolving it against the moment of scraping would turn an approximation
    into a false precision that then ages."""
    relevance: float | None = None
    """How well this matched the query, filled in by the ranker. ``None`` on a
    result that has not been scored yet."""

    def key(self) -> str:
        return f"{self.site}:{self.video_id}"

    def with_relevance(self, score: float) -> "DirectVideo":
        return replace(self, relevance=score)


@dataclass(frozen=True, slots=True)
class DirectSource:
    """One playable rendition of a video."""

    url: str
    label: str
    """What to show in a quality picker, e.g. ``1080p`` or ``HD``."""
    resolution: str | None = None
    size: int | None = None
    mime_type: str = "video/mp4"
    """What the URL actually serves. Not always an MP4: one site hands back an
    HLS playlist for some videos, and a player told to expect MP4 shows a blank
    frame rather than an error."""
    headers: dict[str, str] = field(default_factory=dict)
    """Headers the upstream requires -- Referer, mostly. Several of these CDNs
    return 403 without one, so the value travels with the URL rather than being
    reconstructed by whoever fetches it."""


@dataclass(frozen=True, slots=True)
class DirectAccount:
    """One performer account as a site's model index described it.

    ``handle`` is the site's own slug, which is *not* an identity across sites:
    the same person is ``sophie-rain`` on one and ``sophierain`` on another.
    Collapsing the two is the index's job, not this dataclass's -- here the
    slug is kept verbatim because it is what the site's URLs are built from.
    """

    site: str
    handle: str
    display_name: str
    page_url: str
    avatar: str | None = None
    bio: str | None = None
    video_count: int | None = None
    """``None`` when the site did not say, never zero -- an account shown as
    holding 0 videos reads as empty rather than uncounted."""
    image_count: int | None = None
    of_username: str | None = None
    """The performer's username on onlyfans.com, where the site publishes it.

    Most of these archives do not, and `None` means "this site did not say" --
    never "they have no OnlyFans". A site that does publish it is stating a
    fact the collapsed handle cannot be guessed back into: `sophia-locke` is
    `thesophialocke`, and no amount of slug-mangling reaches that.

    IT IS A CANDIDATE, NOT AN ANSWER. The archive is a third party repeating
    something; the index only records a username once onlyfans.com itself
    confirms it exists. See `onlyfans_addon/service.py`.
    """


@dataclass(frozen=True, slots=True)
class DirectGallery:
    """A set of images, as a site's album listing described it.

    The video/source split applies here too, and for the same reason: a listing
    is cheap and safe to show in bulk, while the image URLs inside a gallery
    are many and often carry the same short-lived tokens a media URL does. A
    gallery is therefore a cover and a count until someone opens it.
    """

    site: str
    gallery_id: str
    title: str
    page_url: str
    cover: str | None = None
    image_count: int | None = None
    posted: str | None = None
    """The site's own date string, unparsed. Sites disagree on format and the
    only use here is display, so parsing would add a failure mode for nothing."""

    def key(self) -> str:
        return f"{self.site}:{self.gallery_id}"


@dataclass(frozen=True, slots=True)
class DirectImage:
    """One image inside a gallery."""

    url: str
    width: int | None = None
    height: int | None = None
    headers: dict[str, str] = field(default_factory=dict)
    """Same contract as :class:`DirectSource.headers`. These CDNs 403 without a
    Referer, so an image URL cannot be dropped into an ``<img src>`` either --
    it has to be fetched by something that can set the header."""
    image_id: str | None = None
    """Stable per-site id, where the site gives its images one.

    Album images on the KVS family have no id of their own -- they are a
    position in a page -- so this stays None there and the gallery index
    identifies them. The post-per-item sites (fapello and its clones) number
    every item, and a mixed feed has to be able to say *which* item without
    relying on an ordinal that shifts the moment the performer posts again."""
    thumbnail: str | None = None
    """A grid-sized crop, where the site serves one separately.

    A feed of full-size images is several megabytes a screen. Where the site
    publishes a thumbnail the grid uses it and the full ``url`` is spent only
    when something is opened."""
    posted_at: str | None = None
    """ISO date the site attributes to the item, when it states one."""
