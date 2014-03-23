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
	 * @param {Object} fc classes set for client
	 */
	init : function(http, fc) {
		var webSockServer = new WSServer({httpServer:httpServer});
		var accept = ['localhost', '127.0.0.1']; // TODO:
		webSockServer.on('request', function (req) {
			req.origin = req.origin || '*';
			if (accept.indexOf(url.parse(req.origin).hostname) === -1) {
				req.reject();
				console.log(req.origin + ' access not allowed.');
				return;
			}
			var websocket = req.accept(null, req.origin);
			var conn = new Connection(websocket);
			websocket.on('message', function(msg) {
				conn.netport$n.receive$r(msg.utf8Data);
			});
			websocket.on('close', function (code,desc) {
				conn.term$t();
			});
		});
		for ( var i in fc ) {
			conn.store$s.regcls$x(i, fc[i]);
		}
		this.mkjs(fc);
	},

	/**
	 * @method mkjs
	 * @memberOf tikitaka
	 * @param {Object} fc classes set for client
	 */
	mkjs : function(fc) {
		var code = 'function O(){this.l={}}module.exports=O;O.prototype.g=function(a){return this.l[a]};O.prototype.r=function(c){var a=this.l;for(var b in a){if(a[b]===c){return b}}var b=function(){return(new Date()).getTime()}();a[b]=c;return b};O.prototype.x=function(b,a){this.l[b]=a};O.prototype.t=function(){var a=this.l;for(var b in a){if(a[b].term){a[b].term()}a[b]=null}this.l=null};O.prototype.i=function(a){if(!(this.l[a] instanceof Function)){return null}return this.r(new this.l[a])};var r=false;var c={n:new N(c),s:new O(),w:new WebSocket("wss://URL:PORT/NAME")};c.w.onopen=function(){r=true};c.w.onmessage=function(a){c.n.r(a.utf8Data)};function PROXY(){var a=this;c.n.c(arguments.callee.name,function(b){a.c=b})}PROXY.prototype.MEMBER=function(){c.n.s(this.c,MEMBER,arguments)};var NS="^";var PS="`";var SS="\'";var VS="~";var FS="&";var IS="%";var ZS="\\"+NS+PS+SS+"\\"+VS+FS+IS;var SR=new RegExp("([\\\\"+ZS+"])","mg");var SL=new RegExp("["+ZS+"][^"+ZS+"]*","mg");var S2=new RegExp("^\\["+ZS+"]","m");function N(a){this.p=a}module.exports=N;N.prototype.r=function(a){+function(){a=a.match(SL);for(var h=0;h<a.length;h++){var g=a[h].length-1;if(a[h].charAt(g)=="\\"){a[h]=a[h].substr(0,g)+a.splice(parseInt(h--,10)+1,1)}a[h]=a[h].replace("\\\\","\\")}}();function e(g){return[g[0],g.substr(1)]}var b=0;var d=this;var f={XX:function(){d.p.e(0,a)},"`":function(){var h=d.p.s.g(a[b++].substr(1));if(h==null){d.p.e(1,a)}var g=e(a[b]);b++;if(g[0]!=NS){f.XX()}h[g[1]](c.EX())},"&":function(){var g=d.p.s.g(a[b++].substr(1));g(c.EX())},"%":function(){var h=d.p.s.i(a[b].substr(1));if(!h){d.p.e(2,a)}var g=e(a[++b]);d.p.w.send(FS+g[1]+VS+h)},EX:function(){var g=f[a[b][0]||"XX"]||f.XX;g()}};var c={XX:function(){return null},"`":function(){b++;if(a[b][0]==NS){var g={__ID__:a[b-1].substr(1)};while(a[b]){if(a[b][0]==SS){break}g[a[b++].substr(1)]=c.EX()}}else{var g=[];while(a[b]){if(a[b][0]==SS){break}g.push(c.EX())}}b++;return g},"&":function(){var g=a[b++].substr(1);if(a[b].length==1){var h=a[b-1].substr(1);b++;return function(){d.p.n.s(this.__ID__,h,arguments)}}else{var h=a[b++].substr(1);return function(){d.p.n.s2(h,arguments)}}},"~":function(){return a[b++].substr(1)},EX:function(){var g=c[a[b]?a[b][0]:"XX"]||c.XX;return g()}};f.EX()};N.prototype.z=function(a){var d="";var c=this;if(!(o instanceof Object)){d+=VS+c.e(o)}else{d+=PS+c.p.s.r(o);if(o instanceof Array){for(var b=0;b<o.length;b++){d+=arguments.calee(o[b])}}else{if(!(o instanceof Function)){for(var b in o){d+=VS+c.e(b)+arguments.calee(o[b])}}}d+=PS}return d};N.prototype.s=function(b,a,c){this.p.w.send(PS+b+NS+t.e(a)+this.z(c))};N.prototype.s2=function(b,a){this.p.w.send(FS+b+this.z(a))};N.prototype.c=function(a,b){this.p.w.send(IS+s+IS+this.p.s.r(b))};N.prototype.e=function(a){return a.toString().replace(SR,"\\\1")};N.prototype.t=function(){};';
		// TODO:
	}
};


