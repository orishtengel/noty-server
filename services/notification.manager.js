const { getUser, updateUserNotification } = require("../firebase/NotyFirestoreConnection")
const { sendEmail } = require("./email.service")
const dateFormat = require('dateformat');
const moment = require('moment'); 
const { default: parse } = require("node-html-parser");
const fs = require('fs');
const path = require('path');

class NotificationManager {

    async sendNotification(crawler, subscription, user, availableDates) {
        // if(user.lastNotificationDate) {
        //     const lastNotificationDate = new Date(user.lastNotificationDate)
        //     const delta = moment(new Date()).diff(lastNotificationDate, 'minutes')
        //     if(delta < 40)
        //         return
        // }
        
        await updateUserNotification(subscription.email, 'email', dateFormat(new Date(), "isoDateTime"))
    
        await this.sendEmailNotification(crawler, subscription.email, user, availableDates)
    }

    async sendEmailNotification(crawler, email, user, availableDates) {
        let title = "Alert! Birdy-like Tee May be available "
        if(user) {
            title = "Alert! " + user.name + " " + "Birdy-like Tee May be available "
        }
        const html = this._prepareEmailBody(crawler, availableDates)
        sendEmail(email, title, html)
    }

    sendPushNotification(email, user, text) {

    }

    _prepareEmailBody(crwaler, availableDates) {
        let course_title = "<h4 style = 'color: #fffefe; text-align: center'> "
        let body = "<h3 style = 'color: #fffefe; text-align: center'> "
        availableDates.map(availableDateJs => {
            body += availableDateJs.hour() + ":" + availableDateJs.minute() + " "
        })
        try {
            var data = fs.readFileSync(path.join(__dirname, '..', 'views', 'index.html'), 'utf8')
        } 
        catch (err) {
            console.error(err)
        }
        const root = parse(data)
        const alink = "<a style = 'color: #fffefe; font-size: 20px' href='" + crwaler.url + "'> Book now! </a>"
        if( crwaler && crwaler.title )
        {
            course_title = course_title + crwaler.title
        }
        else
            course_title = course_title + ""
        
        root.querySelector("#title_course").set_content(course_title + "</h4>")
        root.querySelector("#url").set_content(alink)
        root.querySelector("#data").set_content(body + "</h3>")
        root.querySelector("#timestamp").set_content(String(Math.random()))
        let html = Buffer.from(String(root),'utf-8').toString()
        return html
    }
}

module.exports = NotificationManager