var fs = require('fs'),
    path = require('path');

var moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/EveningMuseScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTicketFly = (fly) => {
    return fly.substring(7,14);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/MUSE.json', json, 'utf8', ()=>{
        console.log('MUSE.json created');
    })
}

$('div.list-view-details').each(function(i, elem) { 

    var show = {
        venue: 'Evening Muse',
        event: '',
        date: '',
        times: '',
        ticketfly: '',
        tuneStub: '',
        href: '',
        desc: '',
        img: ''
    }

    // band/event
    console.log($(elem).children('h1').text());
    show.event = $(elem).children('h1').text();

    // date

    console.log(moment($(elem).children('h2.dates').text()).format("MM DD 17"));
    show.date = moment($(elem).children('h2.dates').text()).format("MM DD 17");

    // times
    console.log($(elem).children('h2.times').text());
    show.times = $(elem).children('h2.times').text();

    //href
    console.log($(elem).prev().attr('href'));
    show.href = 'http://www.eveningmuse.com' + $(elem).prev().attr('href');

    //ticketfly
    console.log(getTicketFly($(elem).prev().attr('href')));
    show.ticketfly = getTicketFly($(elem).prev().attr('href'));


    console.log(i);
    console.log('\n\n\n');

    shows.push(show);
    
})


makeFile(shows);

//setTimeout(()=>{}, 3000000);
