const TEETimesCrawler = require("./teetimes.crawler");

class BrooksideCrawler extends TEETimesCrawler {
    constructor() {
        super('jyojP9TceJ4hEcz1ojAs', 
            'Brookside Players Club', 
            "https://letsgo.golf/brookside-golf-club/teeTimes/brookside-golf-club-c-w-koiner-1-california/",
            'brookside-golf-club-c-w-koiner-1-california')
    }
}

module.exports = BrooksideCrawler

// new BrooksideCrawler().getAvailableDates().then(console.log)
