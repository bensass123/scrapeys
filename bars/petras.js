// fillmore.js 

var fs = require('fs'),
path = require('path'),
moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/PetrasScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTuneStub = (fly) => {
return fly.substring(43,49);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/PETRAS-PARTIAL.json', json, 'utf8', ()=>{
        console.log('PETRAS-PARTIAL.json created');
    })
}

var script = $('div.main').children('script').html();

//// console.log(script);

var jsonScript = JSON.parse(script);

var shows = [];


jsonScript.forEach(function(element) {
    //// console.log(element);

    let date = moment(element.startDate).format('MM DD YY');
    let time = moment(element.startDate).get('hour');
    let show = {
            venue: "Petra's Bar",
            event: element.name,
            date: date,
            times: '',
            tuneStub: '',
            href: element.url,
            desc: '',
            ticketfly: '',
            img: '',
            tix: '',
            price: ''
    }

    // console.log('XXXXXXXXXXXXXXXXXXX');
    // console.log('XXXXXXXXXXXXXXXXXXX');
    // console.log(element.name);
    //// console.log(element.description);
    // console.log(date);
    // console.log(element.startDate);

    // console.log(element.url);
    // console.log('-------------------');

    shows.push(show);
    
}, this);

// console.log('\n');
// console.log(shows);

makeFile(shows);