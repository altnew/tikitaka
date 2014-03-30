var tikitaka = require('../../lib/tikitaka');
require('../../lib/debug');
var http = require('http');

var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	}
}).listen(8080, function(){});

function Dog() {
}

Dog.prototype.calc = function( arr, f ) {
	console.log('Dog.calc');
	var v = 0, r = '';
	for ( var i in arr ) {
		v += parseInt(arr[i]);
	}
	for ( var i=0; i<v; i++ ) {
		r += 'BOW!! ';
	}
	f(r);
}

function Human() {
}

Human.prototype.calc = function( arr, f ) {
	console.log('Human.calc');
	f("I Can't speak English!!");
}


tikitaka.init(sv, 'localhost:8080',{ Dog:Dog, Human:Human } );
