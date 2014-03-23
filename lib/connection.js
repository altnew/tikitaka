/**
 * @module tikitaka 
 */

var NetPort = require('./netport');
var ObjStore = require('./objstore');

/**
 * @class Conncetion
 * @param {WebSocket} sock$w websocket object
 * @property netport$n {NetPort}
 * @property store$s {ObjStore}
 * @property sock$s {WebSocket}
 */
function Connection(sock$w) {
	this.netport$n = new NetPort(this);
	this.store$s = new ObjStore();
	this.sock$w = sock$w;
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

Connection.prototype.error$e = function(v,t) {
	[
		function() { throw new Error('Received invalid format data(0):'+t)},
		function() { throw new Error('Received objectid is not exist(1):'+t)},
		function() { throw new Error('failed to instantiate class(2):'+t)},
	][v]();
}

