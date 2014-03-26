var tikitaka = require('../lib/tikitaka');
var should = require('should');
var http = require('http');

var sv = http.createServer();
sv.listen(8080, function() {
});

describe('mkjs', function() {
	it('simple pat', function() {
		function ABCDE() { };
		ABCDE.prototype.BBBBB = function()  {};
		var lst = {
			ABCDE : ABCDE 
		};
		tikitaka.url = 'http://aaaa.com:8080/test';
		tikitaka.mkjs(lst);
		console.log(tikitaka.getScript());
	});
	it('multi pat', function() {
		function ABCDE() { };
		ABCDE.prototype.BBBBB = function()  {};
		ABCDE.prototype.CCCCC = function()  {};
		var lst = {
			ABCDE : ABCDE 
		};
		tikitaka.url = 'http://aaaa.com:8080/test';
		tikitaka.mkjs(lst);
		console.log(tikitaka.getScript());
	});
});


