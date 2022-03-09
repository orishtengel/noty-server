
const { createCrawlers } = require("../applications/crawlers/crawler.factory");
const { getSubscriptionsById, getUser } = require("../firebase/NotyFirestoreConnection");
const dateFormat = require('dateformat');
const dayjs = require("dayjs");
const { sendEmail } = require("../services/email.service");
// const { emailTemlate } = require("../views/index.html")
const fs = require('fs');
const { default: parse } = require("node-html-parser");
const { Console } = require("console");




module.exports = {
    start: async () => {
        let body = "<h3 style = 'color: #fffefe; text-align: center'> "
        const crawlers = createCrawlers()
        crawlers.map(async crawler => {
            const url = crawler.url
            const availableDates = await crawler.getAvailableDates()
            const subscriptions = await getSubscriptionsById(crawler.id)
            for (const id in subscriptions) {
                availableDates.map(availableDate => {
                    let availableDateJs = dayjs(availableDate.date)
                    if(dayjs(subscriptions[id].date).format('YYYY-MM-DD') == availableDateJs.format('YYYY-MM-DD')) { 
                       if(dayjs(subscriptions[id].startTime).hour() <= availableDateJs.hour() && availableDateJs.hour() <= dayjs(subscriptions[id].endTime).hour()) {
                            // if(dayjs(subscriptions[id].startTime).minute() <= availableDateJs.minute() && availableDateJs.minute() <= dayjs(subscriptions[id].endTime).minute()) {
                                console.log(subscriptions[id].email)
                                body += availableDateJs.hour() + ":" + availableDateJs.minute() + " "
                       }
                   }
                })
                let user = await getUser(subscriptions[id].email)
                let title = "Hi there are available courts today "
                if(user) {
                     title = "Hi " + user.name + " there are available courts today"
                }
                try {
                    var data = fs.readFileSync('./views/index.html', 'utf8')
                  } catch (err) {
                    console.error(err)
                  }
                const root = parse(data)
                const alink = "<a href='" + url + "'> Book now! </a>"
                root.querySelector("#url").set_content(alink)
                root.querySelector("#data").set_content(body + "</h3>")
                html = Buffer.from(String(root),'utf-8').toString()
                sendEmail(subscriptions[id].email,title,html)
            }
        })
        // setInterval(() => {
           
        //     })
        // }, 60000)
    }
}