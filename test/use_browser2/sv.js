var tikitaka = require('../../lib/tikitaka');
var http = require('http');
var fs = require('fs');

tikitaka.log = function( l, c, o ) {
	console.log(l + ':' + tikitaka.getMessage(c) + ':' + o?o.toString():'');
}

var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	} else if (req.url=='/') {
		fs.readFile('index.html', function(err, data) {
			res.end(data);
		});
	}
}).listen(8080, function(){});

function Dog() {
}

Dog.prototype.run = function( o ) {
	console.log('Dog.calc');
	o.t.e.s.t(':)');
}


tikitaka.init(sv, { Dog:Dog } );
