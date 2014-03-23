var NetPort = require('../lib/netport');
var Connect = require('../lib/connection');
var should = require('should');

describe('receive', function() { 
	it('object is not exist', function() {
		var m ='';
		var conn = new Connect();
		try {
			var pt = new NetPort(conn);
			pt.receive$r("`12345^method1`method`'prop^1'`^1^2^3^4^5'``prop^aaa'`prop2^bbb''");
		} catch(e) { 
			m = e.message;
		}
		m.should.startWith('Received objectid is not exist(1):');
	});
	
	it('object has method receiving no param', function() {
		var d =0;
		var conn = new Connect();
		var id = conn.store$s.regist$r({method:function(){d=1}});
		var pt = new NetPort(conn);
		pt.receive$r('`'+id + "^method");
		d.should.equal(1);
	});
	it('function', function() {
		var d =0;
		var conn = new Connect();
		var id = conn.store$s.regist$r(function(){d=1});
		var pt = new NetPort(conn);
		pt.receive$r('&' + id );
		d.should.equal(1);
	});
	it('object has method receiving primitive param', function() {
		var d =0;
		var send = 'abcde';
		var conn = new Connect();
		var id = conn.store$s.regist$r({method:function(p){d=p}});
		var pt = new NetPort(conn);
		pt.receive$r('`' + id + "^method~" + send);
		d.should.equal(send);
	});

	it('object has method receiving objective param', function() {
		var type ='';
		var conn = new Connect();
		var id = conn.store$s.regist$r({method:function(o){type = typeof(o.calee)}});
		var pt = new NetPort(conn);
		pt.receive$r('`' + id + "^method`122222^calee&'");
		type.should.equal('function');
	});

	it('object has method receiving objective has hierarchy diagram param', function() {
		var type ='';
		var conn = new Connect();
		var p1 = p2 = '';
		var id = conn.store$s.regist$r({method:function(o){p1=o.aaa.bbb.ccc;p2=o.aaa.ddd}});
		var pt = new NetPort(conn);
		pt.receive$r('`' + id + "^method`54332^aaa`44433^bbb`56788^ccc~111'3467^ddd~222''");
		p1.should.equal('111');
		p2.should.equal('222');
	});

	it('succeed to instantiate a class', function() {
		var m = '';
		var t = false
		var conn = new Connect({send : function(mm) {m=mm}});
		conn.store$s.regcls$x('TestClass', function(){ t=true });
		var pt = new NetPort(conn);
		t.should.equal(false);
		pt.receive$r('%TestClass%123');
		m.should.startWith('&123~');
		t.should.equal(true);
	});


	it('failed instantiate class', function() {
		var conn = new Connect({send : function(mm) {}});
		conn.store$s.regcls$x('Test', function(){});
		var pt = new NetPort(conn);
		var m = '';
		try {
			pt.receive$r('%TestClass%123');
		} catch (e) {
			m = e.message;
		}
		m.should.startWith('failed to instantiate class(2)');
	});


});

describe('create', function() {
	it('create proxy object', function() {
		
	});
});

