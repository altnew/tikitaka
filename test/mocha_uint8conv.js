/**
 * Use Mocha module to test this
 */

var conv = require('../lib/uint8conv');
var should = require('should');

describe('Convert string type valuable', function() {
	it('string', function() {
		var a ='あいうえお';
		var b = conv.frS(a);
		var c = conv.toS(b);
		a.should.equal(c);
	});
});

describe('Convert ID type valuable', function() {
	it('number', function() {
		var a = 192837465;
		var b = conv.frID(a,8);
		a.should.equal(conv.toID(b));
	});

	it('number(minus)', function() {
		var a = -192837465;
		var b = conv.frID(a,8);
		a.should.equal(conv.toID(b));
	});
});

/*
describe('Convert number type valuable', function() {
	it('NaN', function() {
		var a = conv.frN(NaN);
		should.equal(Number.isNaN(conv.toN(a)),true);

	});

	it('Infinite', function() {
		var a = conv.frN(Infinity);
		should.equal(Number.isFinite(conv.toN(a)), false);
	});

	it('Integer', function() {
		var a = 0x7fffffffff;
		var b = conv.frN(a);
		console.log(b);
	//	should.equal(a, conv.toN(b));
	});
});*/


