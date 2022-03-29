const BrooksideCrawler = require("./brookside.crawler")
const WestlakeCrawler = require("./crawler.westlake")
const EzLinksCamariloSpringsCrawler = require("./ezlinks.camarilo.springs.crawler")
const EzLinksDeBellCrawler = require("./ezlinks.debell.crawler")
const EzLinksGolfCrawler = require("./ezlinks.gobles.crawler")
const KnollwoodCrawler = require("./knollwood.crawler")
const RiverRidge2Crawler = require("./river.ridge.2.crawler")
const RiverRidgeCrawler = require("./river.ridge.crawler")

module.exports = {
    createCrawlers : () => {
        return [
            new EzLinksGolfCrawler(),
            new WestlakeCrawler(),
            new EzLinksCamariloSpringsCrawler(),
            new EzLinksDeBellCrawler(),
            new RiverRidgeCrawler(),
            new RiverRidge2Crawler(),
            new KnollwoodCrawler(),
            new BrooksideCrawler()
        ]
    }
}