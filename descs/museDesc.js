// muse-description scraper 
// museDesc.js http://www.eveningmuse.com/event/1532618-4-korners-charlotte/

var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/MUSE-PARTIAL.json');
var newData = [];



var doit = (obj) => {  
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        var newobj = obj;

        $('div.artist-box-headliner').each(function(i, elem) { 
            
            newobj.desc += '\n\n---\n\n   ' + $(elem).children('div.bio').text();
            
            
            
            
        })
        // console.log(newobj.desc);

        var tix, i, href;
        href = obj.href;
        var i = href.indexOf('/event/') + 7;
        var tix = 'https://www.ticketfly.com/purchase/event/' + href.substring(i, i+7);
        

        newobj.tix = tix;
        // console.log(tix, '<-- tix');

        // console.log('\n\n', '----');
        newData.push(newobj);
    })
}

for (var i = 0; i < data.length; i++) {
    doit(data[i]);
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/MUSE-FULL.json', json, 'utf8', ()=>{
        console.log('MUSE-FULL.json created');
    })
}




//makeFile(shows);

setTimeout(()=>{
    makeFile(newData);
}, 5000);
