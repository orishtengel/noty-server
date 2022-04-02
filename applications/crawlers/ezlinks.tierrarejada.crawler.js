const EzLinksCrawler = require("./ezlinks.crawler")


class TierraRejadaEzlinkCrawler extends EzLinksCrawler {
    constructor() {
        super(
            'sBR1gXZ890Uykc3zxEVJ',
            'https://tierrarejadapubpp.ezlinksgolf.com',
            'tierrarejadapubpp',
            [19894]
        )
    }
}

module.exports = TierraRejadaEzlinkCrawler

// new TierraRejadaEzlinkCrawler().getAvailableDates().then(console.log)
