import datetime
import logging
from typing import Optional

import hrequests
from pydantic import BaseModel
from selectolax.parser import HTMLParser


class Fanfic(BaseModel):
    id: int
    title: str
    author: str
    date: datetime.date
    url: str
    fandoms: list[str]
    required_tags: list[str]
    tags: list[str]
    summary: Optional[str]
    language: str


class AO3Scraper:
    def __init__(self):
        self.logger = logging.getLogger("scraper")
        self.session: hrequests.Session = hrequests.Session()
        self.base_url = "https://archiveofourown.org"
        self.data: dict[int, Fanfic] = {}

    def execute(self):
        response = self.session.get(f"{self.base_url}/tags/+Anima%20(Manga)/works")
        parser = HTMLParser(response.text)
        while True:
            self.process_page(parser)
            next_button = parser.css_first("#main > ol:nth-child(5) > li.next > a")
            if next_button is None:
                break
            self.logger.info("Navigating to next page...")
            response = self.session.get(self.base_url + next_button.attributes["href"])
            parser = HTMLParser(response.text)
        self.logger.info(f"Processed {len(self.data)} works.")
        for id, work in self.data.items():
            with open(f"data/{id}.json", "x") as f:
                f.write(work.model_dump_json(indent=2))

    def process_page(self, parser: HTMLParser):
        # <ol class="work index group">
        works = parser.css("ol.work.index.group > li")
        for work in works:
            id = int(work.css_first("div.header.module > h4.heading > a").attributes["href"].split("/")[-1])
            title = work.css_first("div.header.module > h4.heading > a").text()
            author = work.css_first("div.header.module > h4.heading > a[rel='author']").text()
            # dd mmm yyyy
            date = datetime.datetime.strptime(work.css_first("div.header.module > p.datetime").text(), "%d %b %Y").date()
            url = self.base_url + work.css_first("div.header.module > h4.heading > a").attributes["href"]
            fandoms = [fandom.text() for fandom in work.css("div.header.module > h5.fandoms.heading > a")]
            required_tags = [tag.text() for tag in work.css("div.header.module > ul.required-tags > li > a > span")]
            tags = [tag.text() for tag in work.css("ul.tags.commas > li")]
            summary_element = work.css_first("blockquote.userstuff.summary")
            summary = summary_element.text(strip=True) if summary_element else None
            language = work.css_first("dl.stats > dd").text()
            self.data[id] = Fanfic(id=id, title=title, author=author, date=date, url=url, fandoms=fandoms, required_tags=required_tags, tags=tags, summary=summary, language=language)
            self.logger.debug(self.data[id].model_dump_json(indent=2))


def main():
    AO3Scraper().execute()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    main()
