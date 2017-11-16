var fs = require('fs');

var buf = fs.readFileSync(process.argv[2]);
var text = buf.toString().split("\n").length;
if (text > 0) text -= 1;
console.log(text);