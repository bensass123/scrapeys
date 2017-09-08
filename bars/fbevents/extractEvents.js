var moment = require('moment');
var path = require('path');
var fs = require('fs');

// the raw data
var venueCaps = process.argv[2].toUpperCase();
var data = require('../../JSON/' + venueCaps + '-PARTIAL.json');
var shows = [];
var show;

// CHANGE VENUE BELOW


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../../cltmusic/JSON/' + venueCaps +'-FULL.json', json, 'utf8', ()=>{
        console.log(venueCaps +'-FULL.json created');
    })
}

data.forEach(function(elem) {
    var show = {
            venue: "Coyote Joe's",
            event: elem.name,
            date: moment(elem.start_time).format('MM DD YY'),
            times: moment(elem.start_time).format('LT'),
            tuneStub: '',
            href: 'http://www.facebook.com/events/' + elem.id,
            desc: elem.description,
            ticketfly: '',
            tix: 'http://www.facebook.com/events/' + elem.id
        }
    
    //event
    // console.log(elem.name);
    // console.log(elem.description);
    // console.log(moment(elem.start_time).format('LT'));
    // console.log(elem.id);

    shows.push(show);
}, this);

setTimeout(()=>{
    makeFile(shows)
}, 500)




