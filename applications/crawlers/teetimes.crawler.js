const request = require("request");
const dateFormat = require('dateformat');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone)
dayjs.extend(utc)

const options = { 
    method: 'GET',
    url: 'https://sg-membership20-portalapi-production.azurewebsites.net/api/courses/reservations_group',
    headers: 
     { 
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,he;q=0.8",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://letsgo.golf/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      }
  };

class TEETimesCrawler {

    constructor(id, name, url, slug, timezone="America/New_York") {
        this.id = id
        this.url = url
        this.slug = slug
        this.tz = timezone
        this.name = name
    }

    async getAvailableDates(askingDate = new Date(), players=4, holes=0) {
        const headers = {
            ...options, 
            url: options.url + `?allCartSelected=true&allRatesSelected=true&date=${dateFormat(askingDate, 'yyyy-mm-dd')}&max_hour=21&max_price=500&min_hour=5&min_price=0&slug=${this.slug}&programId=46`
        }
    
        return new Promise((resolve, reject) => {
            request(headers, (error, response, body) => {
                if (error) reject(error)
                
                const data = JSON.parse(body)
                const arr = data['tee_time_groups'].map(item => {
                    const dt = dayjs.tz(item['tee_off_at_local'], this.tz)
                    return {
                        title: `${dt.format('hh:mm A')}`,
                        hour: dt.format('HH:mm'),
                        dayDate: dt.format('MM/DD/YYYY'),
                        date: dt.toDate(),
                        course: this.name
                    }
                })
                resolve(arr)
            })
        })
    }
}

module.exports = TEETimesCrawler
