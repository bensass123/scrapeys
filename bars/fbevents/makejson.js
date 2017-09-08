var moment = require('moment');
var path = require('path');
var fs = require('fs');

// the raw data



var makeFile = (string) => {
    // var json = JSON.stringify(obj);
    fs.writeFile('../../JSON/' + process.argv[2].toUpperCase() +'-PARTIAL.json', string, 'utf8', ()=>{
        console.log(process.argv[2].toUpperCase() +'-PARTIAL.json created');
    })
}

var jsonThatString = (string) => {
    var newString = string.substring(string.indexOf('[{'), string.indexOf('}]')+2);

    console.log(newString);
    // send to have a json file created out of it
    makeFile(newString);
}

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  // Read the file and print its contents.
  var fs = require('fs')
    , filename = process.argv[2];
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);
    //console.log(data)
    console.log(typeof data);
    jsonThatString(data);
  });




