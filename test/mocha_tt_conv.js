/**
 * Tikitaka test
 * require : mocha, should
 */

var TT = require('../lib/tikitaka.js');
var should = require('should');


describe('getStub', function() {
	it('set one element', function() {
		var tikitaka = new TT();
		tikitaka.set({name:'test', a:0, b:function(){}, c:function(){}});
		console.log(tikitaka.getStub());
		console.log('');
		tikitaka.set({name:'test', a:0, xxxb:function(){}, c:1});
		console.log(tikitaka.getStub());
		console.log('');
		tikitaka.set([{name:'test', a:0, xxxb:function(){}, c:1},{name:'Boo', aa:function(){}}]);
		console.log(tikitaka.getStub());
	});
});

describe('isValidObject', function() {
	it('name property', function() {
		var tikitaka = new TT();
		tikitaka.set({a:0, b:function(){}});
		tikitaka.isValidObject({name:'a'}).should.equal(true);
		tikitaka.isValidObject({name:'a', aaa:''}).should.equal(true);
		tikitaka.isValidObject({name:1}).should.equal(false);
		tikitaka.isValidObject({name:null}).should.equal(false);
		tikitaka.isValidObject({name:function(){}}).should.equal(false);
		tikitaka.isValidObject({name1:'a'}).should.equal(false);
	});
});


