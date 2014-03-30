var tikitaka = require('../../lib/tikitaka');
require('../../lib/debug');
var http = require('http');

var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	}
}).listen(8080, function(){});

function first3() {
	console.log('First3 is instantiated');
}


first3.prototype.init = function(cb) {
	console.log('First3.init is called'); 
	cb({ aaaaa : function(a) { 
			console.log('aaaaa function received message : ' + a);
	}});
}

function first2() {
	console.log('First2 is instantiated');
}


first2.prototype.init = function(cb) {console.log('First2.init is called'); cb({aaaaa:'success!!'});}


function first() {
	console.log('First is instantiated');
}


first.prototype.init = function(cb) {console.log('First.init is called'); cb('success');}




tikitaka.init(sv, 'localhost:8080',{ First:first, First2:first2, First3:first3} );
