// visulite 2 scrapes details

// muse-description scraper 


var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/VISULITE-PARTIAL.json');

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
        $('div#content').each(function(i, elem) { 
            // set ticket link to visulite desc page
            newObj.tix = obj.href;

            // venue corrections
            // console.log('---');
            var venue = obj.venue;
            var text = $(elem).children('p').text().trim();
            // console.log(text, '<-- venue')
            // Belk Theatre
            if (text.includes('Belk Theatre')){
                newObj.venue = 'Belk Theatre';
                // console.log(newObj.venue, ' <--- belk');
            } else if (text.includes('McGlohon Theater')) {
                newObj.venue = 'McGlohon Theater';
                // console.log(newObj.venue, ' <--- mcglohon');
            }
            // console.log('***');
            

            // event title
            var title;
            //add ampersand for multiple bands
            if ($(elem).children('h2').text().length > 1) {
                //// console.log($(elem).children('h2').text().length, ' <--- h2 length');

                title = $(elem).children('h1').text() + ' & ' + $(elem).children('h2').text();
            } else {
                //one band
                title = $(elem).children('h1').text()
            }
            
            // console.log(title);
            newObj.event = title;

            // date
            var str = $(elem).children('p').text();
            str = str.substring(0,10);
            // console.log(moment(str).format('MM DD YY'));
            newObj.date = moment(str).format('MM DD YY');

            // times
            var timeStr = $(elem).children('p').text();
            var ind = timeStr.indexOf('Doors Open');
            //// console.log(timeStr.substring(i + 12, i + 16));
            timeStr = timeStr.substring(ind + 12, ind + 16);
            newObj.times = timeStr;

            //desc
            var desc = $(elem).children('div.bio').text();
            //// console.log(desc);
            newObj.desc = desc;

            

            // console.log('\n\n', '----');
            
            if (!(arrContains(newObj, newData))) {
                newData.push(newObj);
            }
            
        })
    })
}

for (var i = 0; i < data.length; i++) {
    doit(data[i]);
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/VISULITE-FULL.json', json, 'utf8', ()=>{
        // console.log('VISULITE-FULL.json created');
    })
}

setTimeout(()=>{
    makeFile(newData);
}, 3000);
