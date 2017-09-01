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
    fs.writeFile('../JSON/MUSE-PARTIAL.json', json, 'utf8', ()=>{
        console.log('MUSE-PARTIAL.json created');
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

$('div.list-view-item').each(function(i, elem) { 

    var show = {
        venue: 'Evening Muse',
        event: '',
        date: '',
        times: '',
        ticketfly: '',
        tuneStub: '',
        href: '',
        desc: '',
        img: '',
        tix: ''
    }

    // band/event
    var mains = [];
    var headliners = $(elem).children('div.list-view-details').children('h1.headliners');
    //console.log(headliners.length);
    headliners.each((i, elem)=>{
        mains[i] = $(elem).text();
    })
    var event = mains.join(' & ');
    //console.log(event, "  <-- headliners string");
    

    var opener = $(elem).children('div.list-view-details').children('h2.supports').text();
    //console.log(opener.length, ' <---- openers')
    if (opener.length > 0) {
        // console.log(opener,"opening");
        event += " [Opening Act: " + opener + "]";
    }

    show.event = event;
    //console.log(show.event);
    // end band event

    // date

    console.log(moment($(elem).children('div.list-view-details').children('h2.dates').text()).format("MM DD 17"));
    show.date = moment($(elem).children('div.list-view-details').children('h2.dates').text()).format("MM DD 17");

    // times
    //console.log($(elem).children('div.list-view-details').children('h2.times').text());
    show.times = $(elem).children('div.list-view-details').children('h2.times').text().trim();

    //href
    //console.log($(elem).children('div.list-view-details').prev().attr('href'), '<-- href');
    show.href = 'http://www.eveningmuse.com' + $(elem).children('div.list-view-details').prev().attr('href');

    //ticketfly
    var tix, ind, href;
    href = show.href;
    var ind = href.indexOf('/event/') + 7;
    var tix = 'https://www.ticketfly.com/purchase/event/' + href.substring(ind, ind+7);
    

    show.tix = tix;
    // console.log(tix, '<-- tix');


    // console.log(i);
    // console.log('\n\n\n');

    if (!(arrContains(show, shows))) {
        shows.push(show);
    }

    console.log(show, i);
    
})




setTimeout(()=>{
    makeFile(shows);
}, 2000);
