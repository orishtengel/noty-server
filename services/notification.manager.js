const { getUser, updateUserNotification } = require("../firebase/NotyFirestoreConnection")
const { sendEmail } = require("./email.service")
const dateFormat = require('dateformat');
const moment = require('moment'); 
const { default: parse } = require("node-html-parser");

class NotificationManager {

    async sendNotification(subscription, user, availableDates) {
        console.log(subscription)
        if(user.lastNotificationDate) {
            const lastNotificationDate = new Date(user.lastNotificationDate)
            const delta = moment(new Date()).diff(lastNotificationDate, 'minutes')
            console.log('too soon!', delta)
            if(delta < 60)
                return
        }

        await updateUserNotification(subscription.email, 'email', dateFormat(new Date(), "isoDateTime"))

        await this.sendEmailNotification(subscription.email, user, availableDates)
    }

    async sendEmailNotification(email, user, availableDates) {
        let title = "Hi there are available courts today "
        if(user) {
            title = "Hi " + user.name + " there are available courts today"
        }
        const html = this._prepareEmailBody(availableDates)
        sendEmail(email, title, html)
    }

    sendPushNotification(email, user, text) {

    }

    _prepareEmailBody(availableDates) {
        let body = "<h3 style = 'color: #fffefe; text-align: center'> "
        availableDates.map(availableDateJs => {
            body += availableDateJs.hour() + ":" + availableDateJs.minute() + " "
        })
        try {
            var data = fs.readFileSync('./views/index.html', 'utf8')
        } 
        catch (err) {
            console.error(err)
        }
        const root = parse(data)
        const alink = "<a href='" + url + "'> Book now! </a>"
        root.querySelector("#url").set_content(alink)
        root.querySelector("#data").set_content(body + "</h3>")
        html = Buffer.from(String(root),'utf-8').toString()
        return html
    }
}

module.exports = NotificationManager