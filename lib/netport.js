/**
 * @module tikitaka
 */

var NAMESEP$NS = '^';
var PRESEP$PS = '`';
var SUFSEP$SS = "'";
var VALSEP$VS = '~';
var FNCSEP$FS = '&';
var ITCSEP$IS = '%';
var ZS = '\\' + NAMESEP$NS + PRESEP$PS + SUFSEP$SS + '\\' + VALSEP$VS + FNCSEP$FS + ITCSEP$IS; 
var SEPS$SR = new RegExp('([\\\\' + ZS + '])', 'mg');
var SPL$SL = new RegExp('[' + ZS + ']' + '[^' + ZS + ']*', 'mg');
var SPL2$S2 = new RegExp('^\\[' + ZS + ']', 'm');

/** 
 * @class NetPort$N
 * @param {Connection} p the parent connection object
 * @property {Conncetion} p
 */
function NetPort$N(p) {
	this.p = p;
}

/*! ,,, */
module.exports = NetPort$N;
/*! ``` */

/**
 * @method receive$r
 * @memberOf NetPort$N
 * @param {String} m the message received via websocket
 */
NetPort$N.prototype.receive$r = function(m) {
	console.log(m);
	+function() {
		m = m.match(SPL$SL);
		for (var i=0; i<m.length; i++ ) {
			var l = m[i].length-1;
			if (m[i].charAt(l)=='\\')  m[i] = m[i].substr(0,l) + m.splice(parseInt(i--,10)+1,1);
			m[i] = m[i].replace('\\\\', '\\');
		}
	}();
	function sep$s(t) { return [t[0], t.substr(1)] }
	var cur$c = 0;
	var t = this;
	var p = {
		XX : function() { t.p.error$e(0,m) },
		// call a object function
		'`' : function() {
			var o = t.p.store$s.get$g(m[cur$c++].substr(1));
			if (o==null) t.p.error$e(1,m);
			var f = sep$s(m[cur$c]);
			cur$c++;
			if (f[0]!=NAMESEP$NS) p.XX();
			o[f[1]](v.EX());
		},
		// call a function
		'&' : function() {
			var o = t.p.store$s.get$g(m[cur$c++].substr(1));
			o(v.EX());
		},
		// create instance
		'%' : function() {
			// %[classname]%[id of callback function]
			var id = t.p.store$s.instantiate$i(m[cur$c].substr(1));
			if (!id) t.p.error$e(2,m);
			var f = sep$s(m[++cur$c]);
			t.p.sock$w.send(FNCSEP$FS+f[1]+VALSEP$VS+id);
		},
		EX : function() {
			var f = p[m[cur$c][0] || 'XX'] || p.XX;
			f();
		}
	};
	var v = {
		XX : function() { return null },
		// object or array
		'`' : function() {
			// object
			cur$c++;
			if (m[cur$c][0]==NAMESEP$NS) {
				var r = {__ID__:m[cur$c-1].substr(1)};
				while(m[cur$c]) {
					if (m[cur$c][0]==SUFSEP$SS) break;
					r[m[cur$c++].substr(1)] = v.EX();
				}
			// array
			} else {
				var r = [];
				while(m[cur$c]) {
					if (m[cur$c][0]==SUFSEP$SS) break;
					r.push(v.EX());
				}
			}
			cur$c++;
			return r;
		},
		// function
		'&' : function() {
			var d = m[cur$c++].substr(1);
			console.log(cur$c + '&&&' + m);
			// TODO:
			if ( m[cur$c].length==1 ) {
				var n = m[cur$c-1].substr(1);
				cur$c++;
				return function() {
					t.p.netport$n.send$s(this.__ID__, n, arguments);
				}
			} else {
				var n = m[cur$c++].substr(1);
				return function() {
					t.p.netport$n.send2$s2(n, arguments);
				}
			}
		},
		// value
		'~' : function() {
			return m[cur$c++].substr(1);
		},
		EX : function() {
			var f = v[m[cur$c] ? m[cur$c][0] : 'XX'] || v.XX;
			return f();
		}
	};
	p.EX();
}


NetPort$N.prototype.serialize$z = function(args$a) {
	var r = '';
	var t = this;
	if (!(args$a instanceof Object)) {
		r += VALSEP$VS + t.encode$e(args$a);
	} else if (args$a instanceof Function) {
		r += FNCSEP$FS + t.p.store$s.regist$r(args$a) + SUFSEP$SS;
	} else {
		r += PRESEP$PS + t.p.store$s.regist$r(args$a);
		if (args$a instanceof Array) {
			for ( var i=0; i<args$a.length; i++ ) {
				r += arguments.callee.call(t,args$a[i]);
			}
		} else {
			for ( var i in args$a ) {
				r += NAMESEP$NS + t.encode$e(i) + arguments.callee.call(t,args$a[i]);
			}
		}
		r += SUFSEP$SS;
	}
	return r;
}


/**
 * @method send$s
 * @memberOf NetPort$N
 * @param {String} cd$c the object code
 * @param {String} name$n the name of calling method
 * @param {Arguments} args$a the parameters
 */
NetPort$N.prototype.send$s = function(cd$c,name$n, args$a) {
//	var m = function(c,o) {
//		if (!(o instanceof Object)) {
//			c += VALSEP$VS + t.encode$e(o);
//		} else {
//			c += PRESEP$PS + t.p.store$s.regist$r(o);
//			if (o instanceof Array) {
//				for ( var i=0; i<o.length; i++ ) {
//					c += arguments.calee(c,o[i]);
//				}
//			} else if (!(o instanceof Function)) {
//				for ( var i in o ) {
//					c += NAMESEP$VS + t.encode$e(i) + arguments.calee(c,o[i]);
//				}
//			}
//			c += SUFSEP$PS;
//		}
//		return c;
//	}(cd$c + NAMESEP$NS + t.encode$e(name$n), args$a);

	console.log('send1' + cd$c);
	this.p.sock$w.send(PRESEP$PS + cd$c + NAMESEP$NS + this.encode$e(name$n) + this.serialize$z(args$a));
}

/**
 * @method send2$s2
 * @memberOf NetPort$m
 * @param {String} id$i the function id
 * @param {Arguments} args$a the parameters
 */
NetPort$N.prototype.send2$s2 = function(id$i, args$a) {

	console.log('send2' + FNCSEP$FS + id$i + this.serialize$z(args$a));
	this.p.sock$w.send(FNCSEP$FS + id$i + this.serialize$z(args$a));
}


/**
 * @method create$c
 * @memberOf NetPort$N
 * @param {String} name$n class name
 * @param {Function} callback
 * @description this function called from only a client
 */
NetPort$N.prototype.create$c = function(name$n, func$f) {
	this.p.sock$w.send( ITCSEP$IS + name$n + ITCSEP$IS + 
					   this.p.store$s.regist$r(func$f));
}

/**
 * @method encode$e
 * @memberOf NetPort$N
 * @param {String} s the target string
 * @return the string after encoding
 */
NetPort$N.prototype.encode$e = function(s) {
	return s.toString().replace(SEPS$SR, '\\\1');
}

/**
 * @method term$t
 * @memberOf NetPost$N
 */
NetPort$N.prototype.term$t = function() {
}	
