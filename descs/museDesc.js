// muse-description scraper 
// museDesc.js http://www.eveningmuse.com/event/1532618-4-korners-charlotte/

var fs = require('fs'),
path = require('path');

var rp = require('request-promise');

var moment = require('moment');


var cheerio = require('cheerio');


var data = require('../JSON/MUSE.json');
var newData = [];



var doit = (obj) => {  
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        var newobj = obj;
        $('div.artist-box-headliner').each(function(i, elem) { 
            console.log($(elem).children('div.bio').text());
            newobj.desc = $(elem).children('div.bio').text();
            console.log('\n\n', '----');
            
            newData.push(newobj);
        })
    })
}

for (var i = 0; i < data.length; i++) {
    doit(data[i]);
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/MUSE-FULL.json', json, 'utf8', ()=>{
        console.log('MUSE-FULL.json created');
    })
}




//makeFile(shows);

setTimeout(()=>{
    makeFile(newData);
}, 5000);
