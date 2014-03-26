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
		var rep = 'function O(){this.l={}};O.prototype.g=function(c){return this.l[c]};O.prototype.r=function(o){var l=this.l;for(var i in l){if(l[i]===o){return i}}var i=function(){return(new Date()).getTime()}();l[i]=o;return i};O.prototype.x=function(n,o){this.l[n]=o};O.prototype.t=function(){var l=this.l;for(var i in l){if(l[i].term){l[i].term()}l[i]=null}this.l=null};O.prototype.i=function(n){if(!(this.l[n] instanceof Function)){return null}return this.r(new this.l[n])};var NS="^";var PS="`";var SS="\'";var VS="~";var FS="&";var IS="%";var ZS="\\\\"+NS+PS+SS+"\\\\"+VS+FS+IS;var SR=new RegExp("([\\\\\\\\"+ZS+"])","mg");var SL=new RegExp("["+ZS+"][^"+ZS+"]*","mg");var S2=new RegExp("^\\\\["+ZS+"]","m");function N(p){this.p=p};N.prototype.r=function(m){console.log(m);+function(){m=m.match(SL);for(var i=0;i<m.length;i++){var l=m[i].length-1;if(m[i].charAt(l)=="\\\\"){m[i]=m[i].substr(0,l)+m.splice(parseInt(i--,10)+1,1)}m[i]=m[i].replace("\\\\\\\\","\\\\")}}();function s(t){return[t[0],t.substr(1)]}var c=0;var t=this;var p={XX:function(){t.p.e(0,m)},"`":function(){var o=t.p.s.g(m[c++].substr(1));if(o==null){t.p.e(1,m)}var f=s(m[c]);c++;if(f[0]!=NS){p.XX()}o[f[1]](v.EX())},"&":function(){var o=t.p.s.g(m[c++].substr(1));o(v.EX())},"%":function(){var id=t.p.s.i(m[c].substr(1));if(!id){t.p.e(2,m)}var f=s(m[++c]);t.p.w.send(FS+f[1]+VS+id)},EX:function(){var f=p[m[c][0]||"XX"]||p.XX;f()}};var v={XX:function(){return null},"`":function(){c++;if(m[c][0]==NS){var r={__ID__:m[c-1].substr(1)};while(m[c]){if(m[c][0]==SS){break}r[m[c++].substr(1)]=v.EX()}}else{var r=[];while(m[c]){if(m[c][0]==SS){break}r.push(v.EX())}}c++;return r},"&":function(){var d=m[c++].substr(1);if(m[c].length==1){var n=m[c-1].substr(1);c++;return function(){t.p.n.s(this.__ID__,n,arguments)}}else{var n=m[c++].substr(1);return function(){t.p.n.s2(n,arguments)}}},"~":function(){return m[c++].substr(1)},EX:function(){var f=v[m[c]?m[c][0]:"XX"]||v.XX;return f()}};p.EX()};N.prototype.z=function(a){var r="";var t=this;if(!(a instanceof Object)){r+=VS+t.e(a)}else{if(a instanceof Function){r+=FS+t.p.s.r(a)+SS}else{r+=PS+t.p.s.r(a);if(a instanceof Array){for(var i=0;i<a.length;i++){r+=arguments.callee.call(t,a[i])}}else{for(var i in a){r+=NS+t.e(i)+arguments.callee.call(t,a[i])}}r+=SS}}return r};N.prototype.s=function(c,n,a){this.p.w.send(PS+c+NS+this.e(n)+this.z(a))};N.prototype.s2=function(i,a){this.p.w.send(FS+i+this.z(a))};N.prototype.c=function(n,f){this.p.w.send(IS+n+IS+this.p.s.r(f))};N.prototype.e=function(s){return s.toString().replace(SR,"\\\\\1")};N.prototype.t=function(){};var r=false;var c={s:new O(),w:new WebSocket("ws://URL"),r:function(a){if(a.length===1){return a[0]}var r=[];for(var i=0;i<a.length;i++){r.push(a[i])}return r},e:function(a,b){alert(a+":"+b)}};c.n=new N(c);c.w.onopen=function(){r=true};c.w.onmessage=function(d){c.n.r(d.data)};';
		var bs = 'function PROXY(){var t=this;t.q=[];c.n.c("PROXY",function(a){t.c=a;for(var i in t.q){c.n.s(a,t.q[i].m,t.q[i].a)}})}PROXY.prototype.__c=function(m,a){var t=this;if(t.c!==void 0){c.n.s(t.c,m,a)}else{t.q.push({m:m,a:a})}};';
		var bsm = 'PROXY.prototype.MEMBER=function(){this.__c("MEMBER",c.r(arguments))};';
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


