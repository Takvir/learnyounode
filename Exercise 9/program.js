var http = require('http');
function get(url, callback){
    http.get(url, function(res){
        res.setEncoding('utf8');
        var msg = '';
        res.on("data", function(data){
            msg += data;
        });
        res.on("error", function(err){
            callback(err);
        });
        res.on("end", function(data){
            callback(null, msg);
        });
    })
}

var rAll = [];
var rLimit = 0;
var rDone = 0;

function checkDone(){
    if(rDone == rLimit){
        rAll.sort(function(a,b){
            if(a[0] > b[0]) return 1;
            else if(a[0] < b[0]) return -1;
            else return 0;
        });
        rAll.forEach(function(r){
            console.log(r[1]);
        });
    }
}

for(var i=2; i<process.argv.length; i++){
    rLimit++;
    (function(i){
        get(process.argv[i], function(err, data){
            if (err) throw err;
            else{
                rAll.push([i-2, data]);
                rDone++;
                checkDone();
            }
        });
    })(i);
}