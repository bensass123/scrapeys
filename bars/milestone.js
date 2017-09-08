var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/MilestoneScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTuneStub = (fly) => {
    return fly.substring(43,49);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/MILESTONE-FULL.json', json, 'utf8', ()=>{
        console.log('MILESTONE-FULL.json created');
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

$('div.eventlist--upcoming').children('article').each(function(i, elem) { 

    var show = {
        venue: 'The Milestone Club',
        event: '',
        date: '',
        times: '',
        tuneStub: '',
        href: '',
        desc: '',
        ticketfly: '',
        tix: ''
    }

    // band/event
    // console.log($(elem).children('div.eventlist-column-info').children('h1.eventlist-title').text());
    show.event = $(elem).children('div.eventlist-column-info').children('h1.eventlist-title').text();

    // date
    // console.log(moment($(elem).children('a.eventlist-column-date').children('div.eventlist-datetag').children('div.eventlist-datetag-inner').children('div.eventlist-datetag-startdate').text()).format('MM DD 17'));
    show.date = moment($(elem).children('a.eventlist-column-date').children('div.eventlist-datetag').children('div.eventlist-datetag-inner').children('div.eventlist-datetag-startdate').text()).format('MM DD 17');

    //desc 
    var descStr = $(elem).children('div.eventlist-column-info').children('div.eventlist-excerpt').text();
    descStr = descStr.substring(0, descStr.length - 11);
    // console.log(descStr);
    show.desc = descStr;

    // times
    var times = $(elem).children('div.eventlist-column-info').children('ul.eventlist-meta').children('li.eventlist-meta-time').text().trim();
    times = 'Doors:   ' + times.substring(0,7).trim();
    // console.log(times);
    show.times = times;

    //ticketfly
    var flyStr = $(elem).children('div.eventlist-column-info').children('div.eventlist-excerpt').children('p').children('a').attr('href');
    if (flyStr != null) {
        show.tix = flyStr;
    }

    // console.log(show.tix, "  <--- tix");
    // console.log(i, "<-index");

    // console.log('\n');
    
    
    if (!(arrContains(show, shows))) {
        shows.push(show);
    }
        
    
})


setTimeout(()=>{
    makeFile(shows);
}, 1000);


// console.log(shows.length, '<-- shows.length');
