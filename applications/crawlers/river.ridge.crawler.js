const request = require("request");
const dateFormat = require('dateformat');
const dayjs = require('dayjs')

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

class RiverRidgeCrawler {
    id = 'PZsyywcBwauDtrcAcJFW'
    url = "https://letsgo.golf/river-ridge-golf-club/teeTimes/river-ridge-golf-club-vineyard-california/"
    
    async getAvailableDates(askingDate = new Date(), players=4, holes=0) {
        const headers = {
            ...options, 
            url: options.url + `?allCartSelected=true&allRatesSelected=true&date=${dateFormat(askingDate, 'yyyy-mm-dd')}&max_hour=21&max_price=500&min_hour=5&min_price=0&slug=river-ridge-golf-club-vineyard-california&programId=46`
        }
    
        return new Promise((resolve, reject) => {
            request(headers, function (error, response, body) {
                if (error) reject(error)
                
                const data = JSON.parse(body)
                const arr = data['tee_time_groups'].map(item => {
                    let dt = dayjs(item['tee_off_at_local'])
                    return {
                        title: `${dt.format('hh:mm A')}`,
                        hour: dt.format('HH:mm'),
                        dayDate: dt.format('MM/DD/YYYY'),
                        date: dt.toDate(),
                        course: 'River Ridge Vineyard'
                    }
                })
                resolve(arr)
            })
        })
    }
}

module.exports = RiverRidgeCrawler

new RiverRidgeCrawler().getAvailableDates().then(console.log)
