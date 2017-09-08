var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/TinRoofScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTicketFly = (fly) => {
    return fly.substring(7,14);
}

var isLive = (str) => {
    var r = str.toLowerCase().includes('karaoke') ||
            str.toLowerCase().includes('watch party') ||
            str.toLowerCase().includes('trivia') ||
            str.toLowerCase().includes('guest list') ||
            str.toLowerCase().includes('private');
    return !r;
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/TINROOF-FULL.json', json, 'utf8', ()=>{
        console.log('TINROOF-FULL.json created');
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

$('tr').each(function(i, elem) { 

    var show = {
        venue: 'The Tin Roof',
        event: '',
        date: '',
        times: '',
        ticketfly: '',
        href: '',
        desc: '',
        tuneStub: '',
        img: '',
        tix: ''
    }

    // band/event
    //// console.log($(elem).children('td.name').children('h3').text().trim());
    show.event = $(elem).children('td.name').children('h3').text().trim();

    // tix
    var tix = $(elem).children('td.name').children('a').attr('href');
    if (tix != null) {
        show.tix=tix;
    }
    // console.log(show.tix, '  <--- tix');
    
    //// console.log($(elem).children('td.date').children('ul').text().trim());
    // var str = $(elem).children('td.date').children('ul').text().trim();
    
    show.date = moment($(elem).children('td.date').children('ul').text().trim()).format('MM DD 17');

    // // console.log(moment($(elem).children('td.date').children('ul').text().trim()).format('MM DD 17'));

    // // times
    // console.log(moment($(elem).children('td.date').children('ul').text().trim()).format('hh:mm'));
    show.times = moment($(elem).children('td.date').children('ul').text().trim()).format('hh:mm');

    //desc
    //// console.log($(elem).children('td.name').children('div.event-info').children('p').text().trim());
    show.desc = $(elem).children('td.name').children('div.event-info').children('p').text().trim();

    // //href
    // // console.log($(elem).prev().attr('href'));
    // show.href = 'http://www.eveningmuse.com/' + $(elem).prev().attr('href');

    // //ticketfly
    // // console.log(getTicketFly($(elem).prev().attr('href')));
    // show.ticketfly = getTicketFly($(elem).prev().attr('href'));


    // // console.log(i);
    // console.log('\n\n\n');


    // test to see if live music before pushing to array
    if (isLive(show.desc) && isLive(show.event) && !(arrContains(show, shows))) {
        shows.push(show);
    }
     
    //// console.log(show);
    
})

// functiont hat tests eevnt string against not words, return ture false

setTimeout(()=>{
    makeFile(shows);
}, 500);

