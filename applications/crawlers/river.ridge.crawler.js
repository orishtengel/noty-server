const TEETimesCrawler = require("./teetimes.crawler");

class RiverRidgeCrawler extends TEETimesCrawler {
    constructor() {
        super(
            'PZsyywcBwauDtrcAcJFW',
            'River Ridge Vineyard',
            "https://letsgo.golf/river-ridge-golf-club/teeTimes/river-ridge-golf-club-vineyard-california/",
            'river-ridge-golf-club-vineyard-california'
        )
    }
}

module.exports = RiverRidgeCrawler

// new RiverRidgeCrawler().getAvailableDates().then(console.log)
