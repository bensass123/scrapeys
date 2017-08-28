// visulite 2 scrapes details

// muse-description scraper 


var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/VISULITE.json');

var newData = [];

// date, times, id, href, desc, img

var doit = (obj) => {  
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        var newObj = obj;
        $('div#content').each(function(i, elem) { 
            // event title
            var title = $(elem).children('h1').text() + ' & ' + $(elem).children('h2').text();
            console.log(title);
            newObj.event = title;

            // date
            var str = $(elem).children('p').text();
            str = str.substring(0,10);
            console.log(moment(str).format('MM DD YY'));
            newObj.date = moment(str).format('MM DD YY');

            // times
            var timeStr = $(elem).children('p').text();
            var i = timeStr.indexOf('Doors Open');
            console.log(timeStr.substring(i + 12, i + 16));
            timeStr = timeStr.substring(i + 12, i + 16);
            newObj.times = timeStr;

            //desc
            var desc = $(elem).children('div.bio').text();
            console.log(desc);
            newObj.desc = desc;

            

            console.log('\n\n', '----');
            
            newData.push(newObj);
        })
    })
}

for (var i = 0; i < data.length; i++) {
    doit(data[i]);
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/VISULITE-FULL.json', json, 'utf8', ()=>{
        console.log('VISULITE-FULL.json created');
    })
}

setTimeout(()=>{
    makeFile(newData);
}, 3000);
