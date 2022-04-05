
const { createCrawlers } = require("../applications/crawlers/crawler.factory");
const { getSubscriptionsById, getUser, deleteSubscribe } = require("../firebase/NotyFirestoreConnection");
const dateFormat = require('dateformat');
const dayjs = require("dayjs");
const { sendEmail } = require("../services/email.service");
// const { emailTemlate } = require("../views/index.html")
const { default: parse } = require("node-html-parser");
const NotificationManager = require("../services/notification.manager");
const moment = require('moment'); 

const notificationManager = new NotificationManager()

class NotificationWorker {

    crawl() {
        const crawlers = createCrawlers()
        const Dates = [
            dayjs().toDate(),
            dayjs().add(1, 'day').toDate(),
            dayjs().add(2, 'day').toDate(),
            dayjs().add(3, 'day').toDate(),
            dayjs().add(4, 'day').toDate(),
            dayjs().add(5, 'day').toDate(),
            dayjs().add(6, 'day').toDate(),
            dayjs().add(7, 'day').toDate(),
        ].map(askingDate => {
            crawlers.map(async crawler => {
                const url = crawler.url
                const availableDates = await crawler.getAvailableDates(askingDate)
                const subscriptions = await getSubscriptionsById(crawler.id)
                for (const id in subscriptions) {
                    const momentToday = moment(dayjs().format('MM/DD/YYYY'), 'MM/DD/YYYY')
                    const momentSub = moment(subscriptions[id].endTime.split(' ')[0], 'MM/DD/YYYY')
                    if(momentSub.diff(momentToday) < 0) {
                        // old subscription to delete
                        await deleteSubscribe(crawler.id, id)
                        continue
                    }
                   

                    const datesAvailable = []
                    availableDates.map(availableDate => {
                        let availableDateJs = dayjs(availableDate.date)
                        // comapring the month,day, year part of the dates
                        if(moment(subscriptions[id].date, 'MM/DD/YYYY').diff(moment(availableDate.dayDate, 'MM/DD/YYYY'), 'days') == 0 ) {
                            if(moment(`${availableDate.dayDate} ${availableDate.hour}`, 'MM/DD/YYYY HH:mm').isBetween(
                                moment(subscriptions[id].startTime, 'MM/DD/YYYY HH:mm'),
                                moment(subscriptions[id].endTime, 'MM/DD/YYYY HH:mm')
                            )) {
                                datesAvailable.push(availableDateJs)
                            }
                        }
                    })
    
                    if(datesAvailable.length == 0)
                        continue
                    let user = await getUser(subscriptions[id].email)
                   
                    notificationManager.sendNotification(crawler, subscriptions[id], user, datesAvailable)
                    
                }
            })
        })
    }
}


module.exports = {
    start: async () => {
        const worker = new NotificationWorker()
        worker.crawl()
        // setInterval(() => {
        //     worker.crawl()
        // }, 1000 * 60 * 5)
    }
}