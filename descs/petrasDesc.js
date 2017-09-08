// visulite 2 scrapes details

// muse-description scraper 


var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/PETRAS-PARTIAL.json');

var newData = [];

var arrContains = (item, arr) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].event === item.event) {
            return true;
        }
    }
    return false;
}


// venue,
// event,
// date,
// times,
// tuneStub,
// href,
// desc,
// ticketfly,
// img,
// tix,
// price

// date, times, id, href, desc, img

var scrape = (obj) => {  
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        var newObj = obj;
        
        $('div#content').each(function(i, elem) { 
            
        });
    })
    
}

var go = () => {
    for (var i = 0; i < data.length; i++) {
        scrape(data[i]);
    }
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/PETRAS-FULL.json', json, 'utf8', ()=>{
        console.log('PETRAS-FULL.json created');
    })
}

go();

// setTimeout(()=>{
//     makeFile(newData);
// }, 3000);
