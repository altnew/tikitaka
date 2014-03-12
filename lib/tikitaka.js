/**
 * The module make easy to communicate between client and 
 * server for node.js.
 * @module tikitaka
 */

/**
 * Provides methods for communicating between client and server.
 * @class Tikitaka
 * @param url {String} the name of server domain 
 * @param port {String} the number of port
 * @param jsname {String} the filename of stub script
 */
function Tikitaka(url, port, jsname) {
	this.url = url;
	this.port = port ? port : '8080';
	this.jsname = jsname ? jsname : 'stub.js';
}
module.exports = Tikitaka;

/**
 * Set objects connect to client.
 * This function make the client codes into a variable from parameters.
 * @method set
 * @memberOf Tikitaka#
 * @param {Object} o the target object or array of the target objects
 * @return {Boolean} true - succeeded
 */
Tikitaka.prototype.set = function (o) {
	var stub = "_tt={e:function(o){return o.toString().replace(/$/g,'$$').replace(/:/g,'$')}};";
	var t = this;
	var ret = true;
	this.cls = {};
	var mk = function(oo) {
		if (!t.isValidObject(oo)) {
			ret = false;
			return;
		}
		t.cls[oo.name] = oo;
		stub += 'function ' + oo.name + '(){' 
		      + "this.w=new WebSocket('ws://"  + t.url + ':' + t.port + '/' + oo.name + "')};";
		for (var i in oo.prototype) {
			if (oo.prototype[i] instanceof Function) {
				// TODO:the codes correspond to binary argument is not implemented
				// TODO:delete setInterval
				stub += oo.name + '.prototype.' + i + '=function(){'
				     + "var a=arguments;var d='" + i + "';"
					 + "for(var i=0;a.length;i++){d+=':'+_tt.e(a[i])}"
				   //  + "this.w.send(d)"
					 + "var w=this.w;var i=setInterval(function(){if(w.readyState==0)return;"
					 + "else if(w.readyState==1)w.send(d);clearInterval(i)},0)"
				     + '};';
			}
		}
	};
	if (o instanceof Array) {
		for (var i in o) {
			mk(o[i]);
		}
	} else if (o instanceof Object) {
		mk(o);
	}
	/**
	 * Set the codes for client when the request of it comes.
	 * @method setStub
	 * @memberOf Tikitaka#
	 * @return {String} the codes
	 */
	this.setStub = function(req,res) { 
		if (req.url=='/'+t.jsname) {
			res.writeHead(200, { 'Content-Type': 'text/javascript'});
			res.end(stub);
			return true;
		}
		return false;
	}
	return ret;
};

/**
 * Check whether the object is for Tikitaka.
 * @method isValidObject
 * @memberOf Tikitaka#
 * @param {Object} o the target object
 * @return {Boolean} true - satisfied the necessary conditions
 */
Tikitaka.prototype.isValidObject = function(o) {
	var mString = ['name'];
	for ( var i in mString ) {
		if (typeof(o[mString[i]])!='string') return false;
	}
	return true;
}

/**
 * return the object of relay the message from a client to 
 * the server object.
 * @method getInstance
 * @memberOf Tikitaka#
 * @param {Object} sock the websocket object
 * @param {Object} req the request object
 * @return {Object} the object
 */
Tikitaka.prototype.getInstance = function(sock, req) {
	// TODO:So far this class supports only 'websocket' library
	var tgt = this.cls[req.resource.substr(1)];
	console.log(req.resource);
	console.log(typeof(tgt));
	if (tgt instanceof Function) {
		return new TikitakaSession(sock, req, tgt);
	}
	return null;
}

/**
 * Manage a websocket session.
 * This object is made by a Tikitaka object.
 * @class TikitakaSession
 * @param {Object} sock websocket object
 * @param {Object} req request object
 * @param {Object} cls the target class 
 */
function TikitakaSession(sock, req, cls) {
	this.obj = new cls();
	this.sock = sock;
	this.req = req;
	this.obj.send = function() {
		// TODO:So far not implements
	}
}

/**
 * Relay the notification from a client to the target object.
 * @method receive
 * @memberOf TikitakaSession#
 * @param {Object} msg the message object
 */
TikitakaSession.prototype.receive = function(msg) {
	var d = msg.utf8Data.split(':');
	// TODO:So far passing arguments is not implements.
	this.obj[d]();
}

/**
 * Notify the target object of closing connection.
 * @method terminate
 * @memberOf TikitakaSession#
 */
TikitakaSession.prototype.terminate = function() {
	if (this.obj.terminate instanceof Function) {
		this.obj.terminate();
	}
}

