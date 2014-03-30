var conv = require('../lib/uint8conv');
var should = require('should');

describe('uint8convtest', function() {
	it('test1', function() {
		var a ='あいうえお';
		var b = conv.fromString(a);
		var c = conv.toString(b);
		console.log(b);
		a.should.equal(c);
	});
});
