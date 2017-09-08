// neigborhood 2 scrapes details

// muse-description scraper 


var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/NEIGHBORHOOD-PARTIAL.json');

var newData = [];

var arrContains = (item, arr) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].event === item.event) {
            return true;
        }
    }
    return false;
}

// date, times, id, href, desc, img

var doit = (obj) => {  
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        var newObj = obj;

        var desc = $('div.artist-box-headliner').children('div.bio').text();
        // console.log(desc);
        newObj.desc = desc;

        // setting ticket link
        // https://www.ticketfly.com/purchase/event/1521112
        // http://www.neighborhoodtheatre.com/event/1521112-heather-mcdonald-charlotte/
        var tix, i, href;
        href = obj.href;
        var i = href.indexOf('/event/') + 7;
        var tix = 'https://www.ticketfly.com/purchase/event/' + href.substring(i, i+7);
        

        newObj.tix = tix;
        // console.log(tix, '<-- tix');

        // console.log('\n\n', '----');

        
        if (!(arrContains(newObj, newData))) {
            newData.push(newObj);
        }
            
        
        // })
    })
}

for (var i = 0; i < data.length; i++) {
    doit(data[i]);
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/NEIGHBORHOOD-FULL.json', json, 'utf8', ()=>{
        console.log('NEIGHBORHOOD-FULL.json created');
    })
}

setTimeout(()=>{
    makeFile(newData);
}, 3000);
