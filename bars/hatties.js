// HATTIES GOOGLE CALENDAR


var PublicGoogleCalendar = require('public-google-calendar');
var moment = require('moment');
var fs = require('fs');

var publicGoogleCalendar = new PublicGoogleCalendar({ calendarId: 'gtneb1i00c85n6j41lg2f53t9o@group.calendar.google.com' });

var liveEvents = [];
var eventsFinal = [];

var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('../../cltmusic/JSON/HATTIES-FULL.json', json, 'utf8', ()=>{
        console.log('HATTIES-FULL.json created');
    })
}

var isLiveMusic = (event) => {
    if (event.summary.includes('LIVE')) {
        return true;
    } else {
        return false;
    }
}

var eventObjMaker = (event) => {
    var date = moment(event.start).format('MM DD YY');
    var time;
    if (event.summary.charAt(event.summary.length - 5) == ':') {
        time = event.summary.substring(event.summary.length - 7, event.summary.length).trim()
    } else {
        time = event.summary.substring(event.summary.length - 4, event.summary.length - 2).trim() + ':00pm';
    }
    
    
    if (date > moment().subtract(5, 'days').format('MM DD YY')) {
        var summary = event.summary;
        summary = summary.substring(summary.indexOf(' ') + 1, summary.lastIndexOf(' '));
        let obj = {
            venue: "Hattie's Tap and Tavern",
            event: summary,
            date: date,
            times: time,
            tuneStub: '',
            href: '',
            desc: event.desc,
            ticketfly: '',
            img: '',
            tix: ''
        }
        //// console.log(date);
        //// console.log(event.summary.charAt(event.summary.length - 5));
        eventsFinal.push(obj);
        //// console.log(time);
        // console.log(summary);
        
    } else {
        //// console.log('DATE REJECTED TOO OLD ', date);
    }
}

publicGoogleCalendar.getEvents(function(err, events) {
if (err) { 
    return  console.log(err.message); 
}
// events is now array of all calendar events
events.forEach(function(element) {
    if (isLiveMusic(element)) {
        liveEvents.push(element);
    }
}, this);
liveEvents.forEach(function(element) {
    eventObjMaker(element);
}, this);
//// console.log(eventsFinal);
makeFile(eventsFinal);
});

// summary
// description
// start

