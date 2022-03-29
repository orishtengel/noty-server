const TEETimesCrawler = require("./teetimes.crawler");

class KnollwoodCrawler extends TEETimesCrawler {
    constructor() {
        super('cOJEqhuIMDu58lY8IHPv', 
            'Brookside Players Club', 
            "https://letsgo.golf/brookside-golf-club/teeTimes/brookside-golf-club-c-w-koiner-1-california/",
            'brookside-golf-club-c-w-koiner-1-california')
    }
}

module.exports = KnollwoodCrawler

new KnollwoodCrawler().getAvailableDates().then(console.log)
