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



var isLive = (str) => {
    try {
        var r = str.toLowerCase().includes('karaoke') ||
            str.toLowerCase().includes('watch party') ||
            str.toLowerCase().includes('trivia') ||
            str.toLowerCase().includes('nfl') ||
            str.toLowerCase().includes('private');
        return !r;
    } catch(e) {
        console.log(e);
        return false;
    }
}


data.forEach(function(elem) {
    try {
        if (elem.place.name.includes('The Peculiar Rabbit')) {
            venue = 'The Peculiar Rabbit';
        } else {
            venue = elem.place.name;
        }
        var venue;
        // if (elem.)
        var show = {
                venue: venue,
                event: elem.name,
                date: moment(elem.start_time).format('L'),
                times: moment(elem.start_time).format('LT'),
                tuneStub: '',
                href: 'http://www.facebook.com/events/' + elem.id,
                desc: elem.description,
                ticketfly: '',
                tix: 'http://www.facebook.com/events/' + elem.id
            }     
        if (isLive(show.desc) && isLive(show.event)) {
            shows.push(show);
            console.log(elem.name);
            console.log(venue);
            // console.log(elem);
            // console.log(elem.description);
            console.log(moment(elem.start_time).format('LT'));
            console.log(elem.id);
            console.log('----');
        }
    } catch(e) {
        console.log(e);
    }
}, this);

setTimeout(()=>{
    makeFile(shows)
}, 500)




