/**
 * Simple pattern
 */
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


tikitaka.init(sv, { Dog:Dog, Human:Human } );
