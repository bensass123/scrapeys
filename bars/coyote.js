// coyote.js 

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
fs.writeFile('../JSON/FILLMORE.json', json, 'utf8', ()=>{
    // console.log('FILLMORE.json created');
})
}

$('div.event-btns').each(function(i, elem) { 

var show = {
    venue: '',
    event: '',
    date: '',
    times: '',
    tuneStub: '',
    href: '',
    desc: '',
    ticketfly: ''
}

//// console.log($(elem))

// band/event

// date

//desc 



// times


// //href


//ticketfly



// // console.log(i)

// console.log('\n')

shows.push(show);

})

// uncomment this
// makeFile(shows);



// setTimeout(()=>{}, 3000000);





