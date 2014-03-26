/**
 * @module tikitaka 
 */
var WSServer = require('websocket').server;
var Connection = require('./connection');

/**
 * @namespace tikitaka
 */
module.exports = {
	/**
	 * @method init
	 * @memberOf tikitaka 
	 * @param {http} http server object
	 * @param {String} url the url of websocket
	 * @param {Object} fc classes set for client
	 */
	init : function(http, url, fc) {
		var webSockServer = new WSServer({httpServer:http});
		var accept = ['localhost', '127.0.0.1']; // TODO:
		this.url = url;
		webSockServer.on('request', function (req) {
			req.origin = req.origin || '*';
			//if (accept.indexOf(url.parse(req.origin).hostname) === -1) {
			//	req.reject();
			//	console.log(req.origin + ' access not allowed.');
			//	return;
			//}
			var websocket = req.accept(null, req.origin);
			var conn = new Connection(websocket);
			websocket.on('message', function(msg) {
				conn.netport$n.receive$r(msg.utf8Data);
			});
			websocket.on('close', function (code,desc) {
				conn.term$t();
			});
			for ( var i in fc ) {
				conn.store$s.regcls$x(i, fc[i]);
			}
		});
		this.mkjs(fc);
	},

	/**
	 * @method mkjs
	 * @memberOf tikitaka
	 * @private
	 * @param {Object} fc classes set for client
	 */
	mkjs : function(fc) {
		var rep = '#####$$$$$';
		var bs = '@@@@@';
		var bsm = '&&&&&';
		rep = rep.replace('URL', this.url);
		for (var i in fc ){
			rep += bs.replace(/PROXY/g, i);
			for (var j in fc[i].prototype) {
				rep += bsm.replace(/PROXY/g,i).replace(/MEMBER/g,j);
			}
		}
		this.js = rep;
	},

	/**
	 * @method getScript
	 * @memberOf tikitaka
	 * @return {String} client script
	 */
	getScript : function(){
		return this.js;
	}
};


