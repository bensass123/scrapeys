// fillmore.js 

var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/FillmoreScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTuneStub = (fly) => {
    return fly.substring(43,49);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/FILLMORE-FULL.json', json, 'utf8', ()=>{
        console.log('FILLMORE-FULL.json created');
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

$('div.evContW').each(function(i, elem) { 

    var show = {
        venue: 'The Fillmore',
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
    show.event = $(elem).children('a').children('div.titleWidth').children('div.titleSize').children('div.tSize').text().trim();
    // console.log(show.event);
    
    // venue - underground or fillmore
    var venue = $(elem).children('a').children('div.titleWidth').children('div.vlogo-sm').children('img').attr('src');
    // console.log(venue,'******');
    if (venue.toLowerCase().includes('underground')) {
        // console.log('underground');
        show.venue = "The Underground"
    } else {
        // console.log('fillmore');
    }

    // tix
    show.tix = $(elem).children('div.event-btns').children('a.evTktBtn').attr('href');
    // console.log(show.tix, ' tix <---');

    // href
    show.href = $(elem).children('div.event-btns').children('a.btn-color').attr('href');
    // console.log(show.href);

    // date
    var date = $(elem).children('a').children('div.titleWidth').children('div.titleSize').children('div.eventDate').text().trim();
    date = date.substring(date.length - 6, date.length);
    date = moment(date).format('MM DD 17');
    date = moment(date).format('L');
    show.date = date;
    // console.log(show.date);
    
    // desc 

    // times
    var times = $(elem).children('a').children('div.titleWidth').children('div.titleSize').children('div.eventTime').text().trim();
    // var i = times.indexOf('Show:');
    //times = times.substring(i+5, times.length-2).trim();
    show.times = times;
    // console.log(show.times);

    // IMG
    show.img = $(elem).children('a').children('div.event-imageCal').children('img').attr('src');
    // console.log(show.img);


    // console.log('\n')

    if (!(arrContains(show, shows))) {
        shows.push(show);
    }
    
})

// uncomment this
makeFile(shows);



// setTimeout(()=>{}, 3000000);





