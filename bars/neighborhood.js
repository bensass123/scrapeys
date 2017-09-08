// fillmore.js 

var fs = require('fs'),
    path = require('path'),
    moment = require('moment');


var cheerio = require('cheerio');

var pathway =  path.join(__dirname, '../HTML/NeighborhoodTheatreScrape.html');



var shows = [];

var $ = cheerio.load(fs.readFileSync(pathway));

var getTuneStub = (fly) => {
    return fly.substring(43,49);
}

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../JSON/NEIGHBORHOOD-PARTIAL.json', json, 'utf8', ()=>{
        console.log('NEIGHBORHOOD-PARTIAL.json created');
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
        venue: 'Neighborhood Theatre',
        event: '',
        date: '',
        times: '',
        tuneStub: '',
        href: '',
        desc: '',
        ticketfly: ''
    }

    // band/event
    var event = $(elem).children('div.list-view-details').children('h1.headliners').text();
    // // console.log(event,"main");

    var opener = $(elem).children('div.list-view-details').children('h2.supports').text();
    if (opener.length > 0) {
        // // console.log(opener,"opening");
        event += " [Opening Act: " + opener + "]";
    }

    show.event = event;
    // console.log(show.event);
    // end band event

    // date
    var date = $(elem).children('div.list-view-details').children('h2.dates').text().trim();
    date = date.substring(date.length - 5, date.length);
    // setting year to 18 for any month before August
    if (date.charAt(0) === ' ' && date.charAt(1) <= 7) {
        show.date = moment(date).format('MM DD 18');
    } else {
        show.date = moment(date).format('MM DD 17');
    }
    // console.log(show.date);
    // end date

    //times
    var times = $(elem).children('div.list-view-details').children('h2.times').children('span.doors').text().trim();
    // times = times.substring(times.length - 7, times.length - 2);
    show.times = times;
    // console.log(times);
    //end times
    


    // //href
    var href = $(elem).children('div.list-view-details').children('h1.headliners').children('a').attr('href');
    show.href = 'http://www.neighborhoodtheatre.com' + href;
    // console.log(show.href);
    // end href


    // img
    var img = $(elem).children('a').children('img').attr('src');
    show.img = img;
    // console.log(show.img);



    // // console.log(i)

    // console.log('\n')

    shows.push(show);
    
})

// uncomment this
makeFile(shows);



// setTimeout(()=>{}, 3000000);





