const WestlakeCrawler = require("./crawler.westlake")
const EzLinksCamariloSpringsCrawler = require("./ezlinks.camarilo.springs.crawler")
const EzLinksDeBellCrawler = require("./ezlinks.debell.crawler")
const EzLinksGolfCrawler = require("./ezlinks.gobles.crawler")
const RiverRidgeCrawler = require("./river.ridge.crawler")

module.exports = {
    createCrawlers : () => {
        return [
            new EzLinksGolfCrawler(),
            new WestlakeCrawler(),
            new EzLinksCamariloSpringsCrawler(),
            new EzLinksDeBellCrawler(),
            new RiverRidgeCrawler()
        ]
    }
}