const TEETimesCrawler = require("./teetimes.crawler");

class RiverRidge2Crawler extends TEETimesCrawler {
    constructor() {
        super(
            'EjMAKZxArtGKOVSHHPNh',
            'River Ridge Victoria Lakes',
            "https://letsgo.golf/river-ridge-golf-club/teeTimes/river-ridge-golf-club-victoria-lakes-california/",
            'river-ridge-golf-club-victoria-lakes-california'
        )
    }
}

module.exports = RiverRidge2Crawler

// new RiverRidge2Crawler().getAvailableDates().then(console.log)
