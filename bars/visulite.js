var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/VisuliteScrape.html');

var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTicketFly = (fly) => {
    return fly.substring(7,14);
}

var isLive = (str) => {
    var r = str.toLowerCase().includes('mandyland') ||
            str.toLowerCase().includes('burlesque');
    return !r;
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/VISULITE-PARTIAL.json', json, 'utf8', ()=>{
        console.log('VISULITE-PARTIAL.json created');
    })
}

var arrContains = (item, arr) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].event === item.event) {
            return true;
        }
    }
    return false;
}

$('div.showDetails').each(function(i, elem) { 

    var show = {
        venue: 'Visulite Theatre',
        event: '',
        date: '',
        times: '',
        id: '',
        href: '',
        hrefRef: '',
        desc: '',
        img: ''
    }

    //href 
    var hrefString = 'https://www.visulite.com/' + $(elem).children('p.show-details').children('span.ui-button-text').children('a').attr('href');
    show.href = hrefString;
    // console.log(hrefString)

    // console.log('\n\n\n');
    // console.log(i)

    shows.push(show);
})

// console.log(shows.length);
makeFile(shows);

