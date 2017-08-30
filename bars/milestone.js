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

$('article.eventlist-event').each(function(i, elem) { 

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

    //console.log($(elem))

    // band/event
    console.log($(elem).children('div.eventlist-column-info').children('h1.eventlist-title').text());
    show.event = $(elem).children('div.eventlist-column-info').children('h1.eventlist-title').text();

    // date
    console.log(moment($(elem).children('a.eventlist-column-date').children('div.eventlist-datetag').children('div.eventlist-datetag-inner').children('div.eventlist-datetag-startdate').text()).format('MM DD 17'));
    show.date = moment($(elem).children('a.eventlist-column-date').children('div.eventlist-datetag').children('div.eventlist-datetag-inner').children('div.eventlist-datetag-startdate').text()).format('MM DD 17');

    //desc 

    var descStr = $(elem).children('div.eventlist-column-info').children('div.eventlist-excerpt').text();
    descStr = descStr.substring(0, descStr.length - 11);
    console.log(descStr);
    show.desc = descStr;


    // times

    var times = $(elem).children('div.eventlist-column-info').children('ul.eventlist-meta').children('li.eventlist-meta-time').text().trim();
    times = 'Doors:   ' + times.substring(0,7).trim();
    console.log(times);
    show.times = times;

    // //href
   // console.log($(elem).prev().children('a').attr('href'));
    //show.href = 'http://www.tunestub.com/events/' + getTuneStub($(elem).prev().children('a').attr('href'));

    //ticketfly
    var flyStr = $(elem).children('div.eventlist-column-info').children('div.eventlist-excerpt').children('p').children('a').attr('href');
    if (flyStr != null) {
        show.tix = flyStr;
    }
    console.log(show.tix, "  <--- tix");
    // var i = flyStr.indexOf('ticketfly.com/event/');
    // if (i > -1) {
    //     var ticketfly = flyStr.substring(i + 20, i + 27);
    //     console.log(ticketfly);
    //     show.ticketfly = ticketfly;
    // }
    



    // console.log(i)

    console.log('\n')

    shows.push(show);
    
})

// uncomment this

//console.log(shows);
makeFile(shows);



// setTimeout(()=>{}, 3000000);


// // h2 topline-info 

// // h1 headliners



// var selectors = {
//     titles: 'a[class=show-title-a]',
//     date: 'span[class=all-date]',
//     desc: 'p[class=show-desc]' 
// }




