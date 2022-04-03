const request = require("request");
const dateFormat = require('dateformat');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(timezone)
dayjs.extend(utc)





const options = { 
    method: 'GET',
    url: 'https://foreupsoftware.com/index.php/api/booking/times',
    headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,he;q=0.8",
        "api-key": "no_limits",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-fu-golfer-location": "foreup",
        "x-requested-with": "XMLHttpRequest",
        // "cookie": "PHPSESSID=9shubthroqol9dssb3koht4iuo",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  }

class ForeupSofrwareCrawler {

    constructor(id, url, courseId, timezone="America/New_York") {
        this.id = id
        this.url = url
        this.tz = timezone
        this.courseId = courseId
    }

    async refreshSessionCookie () {
        return new Promise((resolve, reject) => {
            request(`https://foreupsoftware.com/index.php/booking/21271/${this.courseId}`, { method: 'GET' }, (error, resp, body) => {
                try {
                    if(resp && resp.headers)
                        try {
                            resolve(resp.headers['set-cookie'][0].split(';')[0]) 
                        }
                        catch(e) {
                            console.log(e)
                            resolve(resp.headers['set-cookie'])
                        }
                    else
                        resolve('')
                } 
                catch (err) {
                    resolve('')
                }
            })
        })
    }


    async getAvailableDates(askingDate = new Date(), players=0, holes='all') {
        const headers = {
            ...options,      
            url: options.url + `?time=all&date=${dateFormat(askingDate, 'mm-dd-yyyy')}&holes=${holes}&players=${players}&booking_class=9436&schedule_id=${this.courseId}&schedule_ids%5B%5D=0&schedule_ids%5B%5D=${this.courseId}&specials_only=0&api_key=no_limits`
        }
        headers.headers['cookie'] = await this.refreshSessionCookie()
        return new Promise((resolve, reject) => {
            request(headers, (error, response, body) => {
                if (error) reject(error)
                
                const data = JSON.parse(body)
                const arr = data.map(item => {
                    const dt = dayjs.tz(item['time'], this.tz)
                    return {
                        time: item['time'],
                        title: `${dt.format('hh:mm A')}`,
                        hour: dt.format('HH:mm'),
                        dayDate: dt.format('MM/DD/YYYY'),
                        date: dt.toDate(),
                        course: item['schedule_name']
                    }
                })
                resolve(arr)
            })
        })
    }
}

module.exports = ForeupSofrwareCrawler
