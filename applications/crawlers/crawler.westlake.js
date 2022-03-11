const request = require("request");
const dateFormat = require('dateformat');
const dayjs = require('dayjs')

const options = { 
    method: 'GET',
};

class WestlakeCrawler {
    id = "i3ZIYv7zhVQ2K5E6wlW3"
    url = "https://foreupsoftware.com"
    
    getAvailableDates(askingDate = new Date(), players=4, holes=18) {
        const headers = {
            ...options, 
            url: `${this.url}/index.php/api/booking/times?time=all&date=${dateFormat(askingDate, 'mm-dd-yyyy')}&holes=${holes}&players=${players}&booking_class=1018&schedule_id=1570&schedule_ids%5B%5D=0&schedule_ids%5B%5D=1570&specials_only=0&api_key=no_limits`
        }
    
        return new Promise((resolve, reject) => {
            request(headers, function (error, response, body) {
                if (error) reject(error);
              
                const data = JSON.parse(body)
                resolve(data.map(item => {
                    return {
                        title: item['time'].split(' ')[1],
                        hour: item['time'].split(' ')[1],
                        dayDate: dayjs(item['time']).format('MM/DD/YYYY') ,
                        date: new Date(item['time']),
                        course: item['course_name']
                    }
                }))
            })
        })
    }
}

module.exports = WestlakeCrawler

// new WestlakeCrawler().getAvailableDates().then(console.log)