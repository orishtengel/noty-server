
const { createCrawlers } = require("../applications/crawlers/crawler.factory");
const { getSubscriptionsById, getUser } = require("../firebase/NotyFirestoreConnection");
const dateFormat = require('dateformat');
const dayjs = require("dayjs");
const { sendEmail } = require("../services/email.service");
// const { emailTemlate } = require("../views/index.html")
const fs = require('fs');
const { default: parse } = require("node-html-parser");
const NotificationManager = require("../services/notification.manager");

const notificationManager = new NotificationManager()

class NotificationWorker {

    crawl() {
        const crawlers = createCrawlers()
        crawlers.map(async crawler => {
            const url = crawler.url
            const availableDates = await crawler.getAvailableDates()
            const subscriptions = await getSubscriptionsById(crawler.id)
            console.log(availableDates, subscriptions)
            for (const id in subscriptions) {
                const datesAvailable = []
                
                availableDates.map(availableDate => {
                    let availableDateJs = dayjs(availableDate.date)
                    if(dayjs(subscriptions[id].date).format('YYYY-MM-DD') == availableDateJs.format('YYYY-MM-DD')) { 
                       if(dayjs(subscriptions[id].startTime).hour() <= availableDateJs.hour() && availableDateJs.hour() <= dayjs(subscriptions[id].endTime).hour()) {
                            // if(dayjs(subscriptions[id].startTime).minute() <= availableDateJs.minute() && availableDateJs.minute() <= dayjs(subscriptions[id].endTime).minute()) {
                                datesAvailable.push(availableDateJs)
                       }
                   }
                })

                if(datesAvailable.length == 0)
                    continue

                let user = await getUser(subscriptions[id].email)
                
                notificationManager.sendNotification(subscriptions[id], user, datesAvailable)
            }
        })
    }
}


module.exports = {
    start: async () => {
        // const worker = new NotificationWorker()
        // worker.crawl()

        // setInterval(() => {
        //     worker.crawl()
        // }, 60000)
    }
}