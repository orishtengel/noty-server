

const ForeupSofrwareCrawler = require("./foreupsoftware.crawler");

class SimiHillCrawler extends ForeupSofrwareCrawler {
    constructor() {
        super(
            'MLow81RUEhU7iLgTEbyO', 
            "https://foreupsoftware.com/index.php/booking/21271/7461#/teetimes/",
            '7461')
    }
}

module.exports = SimiHillCrawler

// new SimiHillCrawler().getAvailableDates().then(console.log)
