// neigborhood 2 scrapes details

// muse-description scraper 


var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/NEIGHBORHOOD.json');

var newData = [];

// date, times, id, href, desc, img

var doit = (obj) => {  
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        var newObj = obj;

        var desc = $('div.artist-box-headliner').children('div.bio').text();
        console.log(desc);
        newObj.desc = desc;

        console.log('\n\n', '----');
            
        newData.push(newObj);
        // })
    })
}

for (var i = 0; i < data.length; i++) {
    doit(data[i]);
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/NEIGHBORHOOD-FULL.json', json, 'utf8', ()=>{
        console.log('NEIGHBORHOOD-FULL.json created');
    })
}

setTimeout(()=>{
    makeFile(newData);
}, 3000);
