const request = require("request");
const dateFormat = require('dateformat');
const dayjs = require('dayjs')

const options = { 
    method: 'POST',
    url: 'https://losrobles.ezlinksgolf.com/api/search/search',
    headers: 
     { 
       'cache-control': 'no-cache',
       // cookie: '_gcl_au=1.1.260582429.1645385910; _ga=GA1.2.1558787060.1645385912; EZBookPro.SessionId=xr0pwtwg1exlzymsq5jzubia; _gid=GA1.2.2063721377.1646505631; _gat_UA-57368300-56=1',
       'accept-language': 'en-US,en;q=0.9,he;q=0.8',
       'accept-encoding': 'gzip, deflate, br',
       referer: 'https://losrobles.ezlinksgolf.com/index.html',
       'sec-fetch-dest': 'empty',
       'sec-fetch-mode': 'cors',
       'sec-fetch-site': 'same-origin',
       origin: 'https://losrobles.ezlinksgolf.com',
       'sec-ch-ua-platform': '\\"macOS\\"',
       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
       'sec-ch-ua-mobile': '?0',
       'content-type': 'application/json; charset=UTF-8',
       accept: 'application/json, text/plain, */*',
       'sec-ch-ua': '\\" Not A;Brand\\";v=\\"99\\", \\"Chromium\\";v=\\"98\\", \\"Google Chrome\\";v=\\"98\\"',
       'content-length': '93',
       connection: 'keep-alive',
       host: 'losrobles.ezlinksgolf.com' 
      }
  };

class EzLinksGolfCrawler {
    id = 'suUjxBrmaqG0rLyCtyHx'
    url = "https://losrobles.ezlinksgolf.com/"
    async refreshSessionCookie () {
        return new Promise((resolve, reject) => {
            request('https://losrobles.ezlinksgolf.com/api/search/init', { method: 'GET' }, (error, resp, body) => {
                try {
                    console.log(resp)
                    if(resp && resp.headers)
                        resolve(resp.headers['set-cookie'][0].split(';')[0]) 
                } catch (err) {
                    console.log(err)
                }
            })
        })
    }
    
    async getAvailableDates(askingDate = new Date(), players=4, holes=0) {
        const headers = {
            ...options, 
            cookie: await this.refreshSessionCookie(),
            body: JSON.stringify({
                p01: [6070], // Course ID 
                p02: dateFormat(askingDate, 'mm/dd/yyyy'), // Date - "03/05/2022"
                p03: "5:00 AM", // Start Time
                p04: "7:00 PM", // End Time
                p05: holes, // Holes, 0 - "Any" , 1 - "18", 2 - "9"
                p06: players, // Num Of Players
                p07: false,
            })
        }
    
        return new Promise((resolve, reject) => {
            request(headers, function (error, response, body) {
                if (error) reject(error);
              
                const data = JSON.parse(body)
                const arr = data['r06'].map(item => {
                    return {
                        title: item['r24'],
                        hour: dayjs(item['r15']).format('HH:mm'),
                        dayDate: dayjs(item['r15']).format('MM/DD/YYYY'),
                        date: new Date(item['r15']),
                        course: item['r16']
                    }
                })
                const noDuplicateList = arr.filter((v,i,a)=>a.findIndex(t=>(t.title===v.title))===i)
                resolve(noDuplicateList)
            })
        })
    }
}

module.exports = EzLinksGolfCrawler

// new EzLinksGolfCrawler().getAvailableDates().then(console.log)
