/**
 * @module tikitaka
 */

/** 
 * @class NetPort$N
 * @param {Connection} p the parent connection object
 * @property {Conncetion} p
 */
function NetPort$N(p) {
	this.p = p;
}

/*! ,,, */
var C = require('./uint8conv');
module.exports = NetPort$N;
/*! ``` */

/**
 * @method receive$r
 * @memberOf NetPort$N
 * @param {Uint8Array} m the message received via websocket
 */
NetPort$N.prototype.receive$r = function(m) {
	var t = this;
	t.p.log$e(0,'receive$r', m);
	var p;
	var s = function(n, nn) {
		p = n || p;
		var f = {
			// object
			1 : function() {
				var l, n, r ={__ID__ : C.toID(m.subarray(++p, p+4))};
				p += 4;
				while (p<m.length) {
					l = m[p++];
					if (l===0) break;
					n = C.toS(m.subarray(p,p+l));
					p += l;
					r[n] = s(null,n);
				}
				return r;
			},
			// array
			2 : function() {
				var l = C.toID(m.subarray(++p, p+4)), r = [];
				p += 4;
				for ( var i=0; i<l; i++ ) {
					r.push(s());
				}
				return r;
			},
			// function
			3 : function(n) {
				var id = C.toID(m.subarray(++p, p+4));
				p += 4;
				return (id==0) ?
					function() { t.p.netport$n.sendO$s1(C.frID(this.__ID__,4), n, arguments) } :
					function() { t.p.netport$n.sendF$s2(C.frID(id,4), arguments) };
			},
			// string
			4 : function() {
				var l = C.toID(m.subarray(++p, p+4)), r;
				p += 4;
				r = C.toS(m.subarray(p, p+l));
				p += l;
				return r;
			},
			// binary
			5 : function() {
				var l = C.toID(m.subarray(++p, p+4)), r;
				p += 4;
				r = m.subarray(p, p+l);
				p += l;
				return r;
			},
			// number
			6 : function() {
				var l = C.toID(m.subarray(++p, p+4)), r;
				p += 4;
				r = C.toS(m.subarray(p, p+l));
				if (r==='Infinity') r=Infinity;
				else r = Number(r);
				p += l;
				return r;
			},
			// null
			7 : function() {
				p++;
				return null;
			},
			// undefined
			255 : function() {
				p++;
				return void 0;
			}
	}[m[p]];
		return f&&f(nn);
	};
	var f = {
		// create instance
		1 : function() {
			var l = m[1],
				cid = m.subarray(2+l,6+l);
			t.p.store$s.move$m(C.toID(cid));
			var n = C.toS(m.subarray(2,2+l)),
				id = t.p.store$s.instantiate$i(n);
			if (!id) throw new Error(1);
			t.send$s([0x03,cid,0x05,0x04,{l:4,d:C.frID(id,4)}]);
		},
		// call member function of object
		2 : function() {
			var id = C.toID(m.subarray(1,5)),
				l = m[5],
				n = C.toS(m.subarray(6,6+l)),
				o = t.p.store$s.get$g(id);
			if (!o) throw new Error(2); 
			var e = s(6+l);
			if(!o[n]) throw new Error(3);
			o[n].apply(o,e);
		},
		// call function
		3 : function() {
			var id = C.toID(m.subarray(1,5)),
				o = t.p.store$s.get$g(id);
			if (!o) throw new Error(4);
			o.apply(null, s(5));
		}
	}[m[0]];
	f&&f();
}


/**
 * @method send$s
 * @memberOf NetPort$N
 * @param {Array} d data
 */
NetPort$N.prototype.send$s = function(d) {
	this.p.log$e(0, 'send$s', d);
	var t = [], l = 0, s;
	for ( var i in d ) {
		if (d[i] instanceof Uint8Array) {
			t[i] = 1; l += d[i].length;
		} else if (d[i] instanceof Object) {
			t[i] = 0; l += d[i].l;
		} else {
			t[i] = 2; l++;
		}
	}
	s = new Uint8Array(l);
	l = 0;
	for ( var i in d ) {
		[
			function() {
				var dd = d[i];
				for ( var j=0; j<dd.l; j++) {
					s[l++] = dd.d[j];
				}
			},
			function() {
				for ( var j=0; j<d[i].length; j++ ) {
					s[l++] = d[i][j];
				}
			},
			function() { s[l++] = d[i]; }
		][t[i]]();
	}
	/*! ,,, */
	var b = new Buffer(s.length);
	for ( var i=0; i<s.length; i++ ) {
		b[i] = s[i];
	}
	s = b;
	/*! ``` */
	this.p.sock$w.send(s);
}

/**
 * @method sendA$s0
 * @memberOf NetPort$N
 * @param {Array} d
 * @param {Arguments} a
 */
NetPort$N.prototype.sendA$s0 = function(d,a) {
	var t = this;
	d.push(0x02);
	d.push({l:4,d:C.frID(a.length,4)});
	var f = function(m, p) {
		if (m instanceof Uint8Array) {
			d.push(0x05);
			d.push({l:4, d:C.frID(m.length,4)});
			d.push(m);
		} else if (m instanceof Function) {
			var id = p ? 0 : t.p.store$s.regist$r(m);
			d.push(0x03);
			d.push({l:4, d:C.frID(id,4)});
		} else if (typeof m === typeof '') {
			var mm = C.frS(m);
			d.push(0x04);
			d.push({l:4,d:C.frID(mm.length,4)});
			d.push(mm);
		} else if (m instanceof Array) {
			d.push(0x02);
			d.push({l:4,d:C.frID(m.length,4)});
			for (var i in m) {
				f(m[i], false);
			}
		} else if (m instanceof Object) {
			var id = t.p.store$s.regist$r(m);
			if (!id) t.p.error$e(10,m);
			d.push(0x01);
			d.push({l:4, d:C.frID(id,4)});
			for (var i in m) {
				var ii = C.frS(i);
				d.push({l:1,d:C.frID(ii.length,1)});
				d.push(ii);
				f(m[i], true);
			}
			d.push(0x00);
		} else if (m===null) {
			d.push(0x07);
		} else if (m!== void 0) {
			var n = C.frS(String(m));
			d.push(0x06);
			d.push({l:4,d:C.frID(n.length,4)});
			d.push(n);
		} else {
			d.push(0xff);
		}
	};
	for ( var i in a ) { f(a[i], false); }
	t.send$s(d);
}


/**
 * @method sendO$s1
 * @memberOf NetPort$N
 * @param {Uint8Array} id
 * @param {String} n
 * @param {Arguments} a
 */
NetPort$N.prototype.sendO$s1 = function(id, n, a) {
	var nn = C.frS(n);
	this.p.netport$n.sendA$s0([0x02, id, {l:1,d:C.frID(nn.length,1)}, nn],a);
}


/**
 * @method sendF$s2
 * @memberOf NetPort$N
 * @param {Uint8Array} id
 * @param {Arguments} a
 */
NetPort$N.prototype.sendF$s2 = function(id, a) {
	this.p.netport$n.sendA$s0([0x03, id],a);
}

/**
 * @method sendC$s3
 * @memberOf NetPost$N
 * @param {String} n ClassName
 * @param {Function} f CallBack
 */
NetPort$N.prototype.sendC$s3 = function(n, f) {
	var nn = C.frS(n);
	var id = this.p.store$s.regist$r(f);
	this.p.netport$n.send$s([0x01, {l:1, d:C.frID(nn.length,1)}, nn, {l:4, d:C.frID(id,4)}]);
}


/**
 * @method term$t
 * @memberOf NetPost$N
 */
NetPort$N.prototype.term$t = function() {
}
