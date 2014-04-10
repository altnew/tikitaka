/**
 * @module tikitaka
 */
var WSServer = require('websocket').server;
var Connection = require('./connection');

/**
 * @class TikitakaServer
 */
function TikitakaServer() {
}

module.exports = TikitakaServer;

/**
 * @method initBase
 * @memberOf TikitakServer 
 * @private
 * @param {http, https} http or https server object
 * @param {Object} fc classes set for client
 * @param {Array} accept accept hosts list
 */
TikitakaServer.prototype.initBase = function(http, fc, accept) {
	var webSockServer = new WSServer({httpServer:http});
	var t = this;
	webSockServer.on('request', function (req) {
		req.origin = req.origin || '*';
		if (accept&&accept.indexOf(url.parse(req.origin).hostname) === -1) {
			req.reject();
			console.log(req.origin + ' access not allowed.');
			return;
		}
		var websocket = req.accept(null, req.origin);
		var conn = new Connection(websocket, t.log);
		websocket.on('message', function(msg) {
			try {
				conn.netport$n.receive$r(new Uint8Array(msg.binaryData));
			} catch (e) {
				conn.log$e(3,e);
			}
		});
		websocket.on('close', function (code,desc) {
			conn.term$t();
		});
		for ( var i in fc ) {
			conn.store$s.regcls$x(i, fc[i]);
		}
	});
	this.mkjs(fc);
};

/**
 * @method init
 * @memberOf TikitakaServer 
 * @param {http} http server object
 * @param {Object} fc classes set for client
 * @param {Array} accept accept hosts list
 */
TikitakaServer.prototype.init = function(http, fc, accept) {
	this.prot = 'ws';
	this.initBase(http, fc, accept);
}

/**
 * @method initSec
 * @memberOf TikitakaServer
 * @param {https} https server object
 * @param {Object} fc classes set for client
 * @param {Array} accept accept hosts list
 */
TikitakaServer.prototype.initSec = function(https, fc, accept) {
	this.prot = 'wss';
	this.initBase(https, fc, accept);
}


/**
 * @method mkjs
 * @memberOf TikitakaSerer
 * @private
 * @param {Object} fc classes set for client
 */
TikitakaServer.prototype.mkjs = function(fc) {
	var rep = '#####$$$$$'.replace(/PROT/g, this.prot);
	var bs = '@@@@@';
	var bsm = '&&&&&';
	for (var i in fc ){
		rep += bs.replace(/PROXY/g, i);
		for (var j in fc[i].prototype) {
			rep += bsm.replace(/PROXY/g,i).replace(/MEMBER/g,j);
		}
	}
	this.js = rep;
}

/**
 * @method log
 * @memberOf TikitakaServer 
 * @param {String} level error level
 * @param {String} code error code
 * @param {String} desc description
 * @description default function is dummy.
 */
TikitakaServer.prototype.log = function(level, code, desc) {
}

/**
 * @method getScript
 * @memberOf TikitakaServer
 * @return {String} client script
 */
TikitakaServer.prototype.getScript = function(){
	return this.js;
},

/**
 * @method getMessage
 * @memberOf TikitakaServer
 * @param {Number} message id
 * @return {String} message description
 */
TikitakaServer.prototype.getMessage = function(id) {
	var mes = {
		'1' : 'failure to create instance',
		'2' : 'called object is not exist',
		'3' : 'called object function is not exist',
		'4' : 'called function id not exist'
	};
	return mes[id] || id;
}


