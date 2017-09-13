var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/SnugScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTuneStub = (fly) => {
    return fly.substring(43,49);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/SNUG-FULL.json', json, 'utf8', ()=>{
        console.log('SNUG-FULL.json created');
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

$('div.show-info').each(function(i, elem) { 

    let show = {
        venue: 'Snug Harbor',
        event: '',
        date: '',
        times: '',
        tuneStub: '',
        href: '',
        desc: '',
        ticketfly: '',
        img: '',
        tix: ''
    }

    // band/event
    // console.log($(elem).children('h3.show-title').text());
    show.event = $(elem).children('h3.show-title').text();

    // date
    // console.log(moment($(elem).children('span.all-date').children('span.show-date').text().trim()).format('MM DD YY'));
    show.date = moment($(elem).children('span.all-date').children('span.show-date').text().trim()).format('L');

    //desc 
    // console.log($(elem).children('p.show-desc').text());
    show.desc = $(elem).children('p.show-desc').text();

    // // times
    // console.log($(elem).children('span.all-date').children('span.show-time').text().trim());
    show.times = 'Doors:  ' + $(elem).children('span.all-date').children('span.show-time').text().trim();

    // //href
    // console.log($(elem).prev().children('a').attr('href'));
    show.href = 'http://www.tunestub.com/events/' + getTuneStub($(elem).prev().children('a').attr('href'));

    //TuneStub
    // console.log(getTuneStub($(elem).prev().children('a').attr('href')));
    show.tuneStub = getTuneStub($(elem).prev().children('a').attr('href'));

    //tix
    show.tix = 'http://www.tunestub.com/events/' + show.tuneStub;
    // console.log(show.tix, ' <---- tix link')


    // // console.log(i)

    // console.log('\n\n\n')

    if (!(arrContains(show, shows))) {
        shows.push(show);
    }
    
})

// uncomment this

// console.log(shows);
makeFile(shows);



// setTimeout(()=>{}, 3000000);


// // h2 topline-info 

// // h1 headliners



// var selectors = {
//     titles: 'a[class=show-title-a]',
//     date: 'span[class=all-date]',
//     desc: 'p[class=show-desc]' 
// }




