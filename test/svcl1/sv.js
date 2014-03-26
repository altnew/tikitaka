var tikitaka = require('../../lib/tikitaka');
var http = require('http');

var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	}
}).listen(8080, function(){});

function first() {
	console.log('created!!');
}


first.prototype.init = function(cb) {console.log('execute init!!'); cb('success');}


tikitaka.init(sv, 'localhost:8080',{ First:first} );
