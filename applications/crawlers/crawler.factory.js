const EzLinksGolfCrawler = require("./ezlinks.gobles.crawler")

module.exports = {
    createCrawlers : () => {
        return [
            new EzLinksGolfCrawler()
        ]
    }
}