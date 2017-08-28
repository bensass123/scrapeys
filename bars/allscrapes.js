// do all scrapes

var s  = require('./snug.js');
var m  = require('./muse.js');
var t  = require('./tinroof.js');
var v = require('./visulite.js');


// do extended scrapes w delay

setTimeout(()=>{
    var m2 = require('../descs/museDesc.js');
    var v2 = require('../descs/visuliteDesc.js');
}, 1000)