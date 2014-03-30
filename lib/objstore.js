/**
 * @module tikitaka 
 */


/**
 * @class ObjStore$O
 * @property l {Object} object hash
 */
function ObjStore$O() {
	this.l = {};
	this.id = 1;
}
/*! ,,, */
module.exports = ObjStore$O;
/*! ``` */

/**
 * @method get$g 
 * @memberOf ObjStore$O
 * @param c the object id
 * @return the object
 */
ObjStore$O.prototype.get$g = function(c) {
	__TLOG('get', c);
	return this.l[c];
}

/**
 * @method regist$r
 * @memberOf ObjStore$O
 * @param o the target object
 * @return ID
 */
ObjStore$O.prototype.regist$r = function(o) {
	var t = this;
	var l = t.l;
	for ( var i in l ) {
		if (l[i]===o) return i;
	}
	var i = function() {
		// TODO:how to create SessionID
		return t.id++;
	}();
	l[i] = o;
	__TLOG('regist', i);
	return i;
}

/**
 * @method regcls$x
 * @memberOf ObjStore$O
 * @param n the name of class 
 * @param o the class
 */
ObjStore$O.prototype.regcls$x = function(n, o) {
	__TLOG('regcls',n);
	this.l[n] = o;
}

/**
 * @method move$m
 * @memberOf ObjStore$O
 * @param id id
 */
ObjStore$O.prototype.move$m = function(id) {
	__TLOG('move$m', id);
	this.id = id;
}

/**
 * @method term$t
 * @memberOf ObjStore$O
 */
ObjStore$O.prototype.term$t = function() {
	var l = this.l;
	__TLOG('term', '');
	for ( var i in l ) {
		if (l[i].term) {
			l[i].term();
		}
		l[i] = null;
	}
	this.l = null;
}

/**
 * @method instantiate$i
 * @memberOf ObjStore$O
 * @param n class name
 * @description this function is called from only the server
 */
ObjStore$O.prototype.instantiate$i = function(n) {
	if (!(this.l[n] instanceof Function) ) return null;
	return this.regist$r(new this.l[n]);
}
