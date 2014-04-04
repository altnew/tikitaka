/**
 * Use Mocha module to test this
 */

var conv = require('../lib/uint8conv');
var should = require('should');

describe('test of uint8convtest object', function() {
	it('string', function() {
		var a ='あいうえお';
		var b = conv.frS(a);
		var c = conv.toS(b);
		a.should.equal(c);
	});

	it('number', function() {
		var a = 192837465;
		var b = conv.frN(a,8);
		a.should.equal(b.toN());
	});

	it('number(minus)', function() {
		var a = -192837465;
		var b = conv.frN(a,8);
		a.should.equal(b.toN());
	});

});
