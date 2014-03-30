require('../lib/debug');
var NetPort = require('../lib/netport');
var Connect = require('../lib/connection');
var should = require('should');

describe('receive', function() {
	it('create instance', function() {
		var conn = new Connect();
		var ret = 0, dd;
		conn.store$s.regcls$x('ABC', function(){ ret =1; });
		var arr = new Uint8Array([0x01,  3, 41,42,43,  0,0,0,1 ]);
		var np = new NetPort(conn);
		conn.sock$w = {
			send : function(w) {
				dd = w;
			}
		};
		np.sendC$s3('ABC',function() { ret=2;});
		np.receive$r(dd);
		ret.should.equal(1);
	});
	

});
