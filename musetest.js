var data = require('./JSON/MUSE.json');

for (var i = 0; i < data.length; i++) {
    console.log(data[i].href, i);
}