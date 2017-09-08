// do all scrapes

var s  = require('./snug.js');
var m  = require('./muse.js');
var t  = require('./tinroof.js');
var v = require('./visulite.js');
var n = require('./neighborhood.js');
var f = require('./fillmore.js');
var milestone = require('./milestone.js');
var h = require('./hatties.js');


// do extended scrapes w delay

setTimeout(()=>{
    var descs = require('../descs/all.js');
}, 15000)


