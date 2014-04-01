/**
 * @module tikitaka 
 */

var NetPort = require('./netport');
var ObjStore = require('./objstore');

/**
 * @class Conncetion
 * @param {WebSocket} sock websocket object
 * @param {Function} log 
 * @property netport$n {NetPort}
 * @property store$s {ObjStore}
 * @property sock$s {WebSocket}
 */
function Connection(sock, log) {
	this.netport$n = new NetPort(this);
	this.store$s = new ObjStore(this);
	this.sock$w = sock;
	this.log = log;
}

module.exports = Connection;

/**
 * @method term$t
 * @memberOf Connection
 */
Connection.prototype.term$t = function() {
	this.netport$n.term$t();
	this.store$s.term$t();
	this.netpost$n = null;
	this.store$s = null;
}

/**
 * @method log$e
 * @param {String} level error level
 * @param {String} code error code
 * @param {String} desc description
 */
Connection.prototype.log$e = function( level, code, desc ) {
	this.log&&this.log(level, code, desc);
}

