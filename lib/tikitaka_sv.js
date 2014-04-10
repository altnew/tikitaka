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
	var rep = ';C={frID:function(d,l){if(!l){return}var r=new Uint8Array(l);for(var i=l;i>0;i--){r[i-1]=d&255;d=d>>>8}return r},toID:function(d){var r=0;for(var i=0;i<d.length;i++){r=r<<8;r+=d[i]}return r},toS:function(d){var out="",i=0,len,c,cs4,c0_7=function(){out+=String.fromCharCode(c)},c12_13=function(){out+=String.fromCharCode(((c&31)<<6)|(d[i++]&63))},c14=function(){out+=String.fromCharCode(((c&15)<<12)|((d[i++]&63)<<6)|(d[i++]&63))},cv={0:c0_7,1:c0_7,2:c0_7,3:c0_7,4:c0_7,5:c0_7,6:c0_7,7:c0_7,12:c12_13,13:c12_13,14:c14};while(i<d.length){c=d[i++];cs4=cv[c>>4];cs4&&cs4()}return out},frS:function(d){var idx=-1,bytes=_bytes=new Uint8Array(512),byteLength=bytes.byteLength,c;for(var i=0;i<d.length;++i){c=d.charCodeAt(i);if(c<=127){bytes[++idx]=c}else{if(c<=2047){bytes[++idx]=192|(c>>>6);bytes[++idx]=128|(c&63)}else{if(c<=65535){bytes[++idx]=224|(c>>>12);bytes[++idx]=128|((c>>>6)&63);bytes[++idx]=128|(c&63)}else{bytes[++idx]=240|(c>>>18);bytes[++idx]=128|((c>>>12)&63);bytes[++idx]=128|((c>>>6)&63);bytes[++idx]=128|(c&63)}}}if(byteLength-idx<=4){byteLength*=2;_bytes=new Uint8Array(byteLength);_bytes.set(bytes);bytes=_bytes}}return new Uint8Array(bytes.subarray(0,++idx))}};function O(p){this.l={};this.id=1;this.p=p};O.prototype.g=function(c){this.p.e(0,"get",c);return this.l[c]};O.prototype.r=function(o){var t=this;var l=t.l;for(var i in l){if(l[i]===o){return i}}var i=function(){return t.id++}();l[i]=o;this.p.e(0,"r",i);return i};O.prototype.x=function(n,o){this.p.e(0,"x",n);this.l[n]=o};O.prototype.m=function(id){this.p.e(0,"m",id);this.id=id};O.prototype.t=function(){var l=this.l;this.p.e(0,"t");for(var i in l){if(l[i].term){l[i].term()}l[i]=null}this.l=null};O.prototype.i=function(n){this.p.e(0,"i");if(!(this.l[n] instanceof Function)){return null}return this.r(new this.l[n])};function N(p){this.p=p};N.prototype.r=function(m){var t=this;t.p.e(0,"r",m);var p;var s=function(n,nn){p=n||p;var f={1:function(){var l,n,r={__ID__:C.toID(m.subarray(++p,p+4))};p+=4;while(p<m.length){l=m[p++];if(l===0){break}n=C.toS(m.subarray(p,p+l));p+=l;r[n]=s(null,n)}return r},2:function(){var l=C.toID(m.subarray(++p,p+4)),r=[];p+=4;for(var i=0;i<l;i++){r.push(s())}return r},3:function(n){var id=C.toID(m.subarray(++p,p+4));p+=4;return function(){console.log(id);if(this.__ID__){t.p.n.s1(C.frID(this.__ID__,4),n,arguments)}else{t.p.n.s2(C.frID(id,4),arguments)}}},4:function(){var l=C.toID(m.subarray(++p,p+4)),r;p+=4;r=C.toS(m.subarray(p,p+l));p+=l;return r},5:function(){var l=C.toID(m.subarray(++p,p+4)),r;p+=4;r=m.subarray(p,p+l);p+=l;return r},6:function(){var l=C.toID(m.subarray(++p,p+4)),r;p+=4;r=C.toS(m.subarray(p,p+l));if(r==="Infinity"){r=Infinity}else{r=Number(r)}p+=l;return r},7:function(){p++;return null},255:function(){p++;return void 0}}[m[p]];return f&&f(nn)};var f={1:function(){var l=m[1],cid=m.subarray(2+l,6+l);t.p.s.m(C.toID(cid));var n=C.toS(m.subarray(2,2+l)),id=t.p.s.i(n);if(!id){throw new Error(1)}t.s([3,cid,5,4,{l:4,d:C.frID(id,4)}])},2:function(){var id=C.toID(m.subarray(1,5)),l=m[5],n=C.toS(m.subarray(6,6+l)),o=t.p.s.g(id);if(!o){throw new Error(2)}var e=s(6+l);if(!o[n]){throw new Error(3)}o[n].apply(o,e)},3:function(){var id=C.toID(m.subarray(1,5)),o=t.p.s.g(id);if(!o){throw new Error(4)}o.apply(null,s(5))}}[m[0]];f&&f()};N.prototype.s=function(d){this.p.e(0,"s",d);var t=[],l=0,s;for(var i in d){if(d[i] instanceof Uint8Array){t[i]=1;l+=d[i].length}else{if(d[i] instanceof Object){t[i]=0;l+=d[i].l}else{t[i]=2;l++}}}s=new Uint8Array(l);l=0;for(var i in d){[function(){var dd=d[i];for(var j=0;j<dd.l;j++){s[l++]=dd.d[j]}},function(){for(var j=0;j<d[i].length;j++){s[l++]=d[i][j]}},function(){s[l++]=d[i]}][t[i]]()};this.p.w.send(s)};N.prototype.s0=function(d,a){var t=this;d.push(2);d.push({l:4,d:C.frID(a.length,4)});var f=function(m){if(m instanceof Uint8Array){d.push(5);d.push({l:4,d:C.frID(m.length,4)});d.push(m)}else{if(m instanceof Function){var id=t.p.s.r(m);d.push(3);d.push({l:4,d:C.frID(id,4)})}else{if(typeof m===typeof""){var mm=C.frS(m);d.push(4);d.push({l:4,d:C.frID(mm.length,4)});d.push(mm)}else{if(m instanceof Array){d.push(2);d.push({l:4,d:C.frID(m.length,4)});for(var i in m){f(m[i])}}else{if(m instanceof Object){var id=t.p.s.r(m);if(!id){t.p.e(10,m)}d.push(1);d.push({l:4,d:C.frID(id,4)});for(var i in m){var ii=C.frS(i);d.push({l:1,d:C.frID(ii.length,1)});d.push(ii);f(m[i])}d.push(0)}else{if(m===null){d.push(7)}else{if(m!==void 0){var n=C.frS(String(m));d.push(6);d.push({l:4,d:C.frID(n.length,4)});d.push(n)}else{d.push(255)}}}}}}}};for(var i in a){f(a[i])}t.s(d)};N.prototype.s1=function(id,n,a){var nn=C.frS(n);this.p.n.s0([2,id,{l:1,d:C.frID(nn.length,1)},nn],a)};N.prototype.s2=function(id,a){this.p.n.s0([3,id],a)};N.prototype.s3=function(n,f){var nn=C.frS(n);var id=this.p.s.r(f);this.p.n.s([1,{l:1,d:C.frID(nn.length,1)},nn,{l:4,d:C.frID(id,4)}])};N.prototype.t=function(){};var c={w:new WebSocket("PROT://"+location.href.split("/")[2]+"/"),r:function(a){if(a.length===1){return a[0]}var r=[];for(var i=0;i<a.length;i++){r.push(a[i])}return r},a:[],e:function(a){}};c.s=new O(c);c.n=new N(c);c.w.binaryType="arraybuffer";c.w.onopen=function(){for(var i in c.a){c.a[i]()}};c.w.onmessage=function(d){try{c.n.r(new Uint8Array(d.data))}catch(e){c.e(e.error)}};'.replace(/PROT/g, this.prot);
	var bs = 'function PROXY(){var t=this;t.q=[];var f=function(){c.n.s3("PROXY",function(a){t.c=a;for(var i in t.q){c.n.s1(C.frID(a,4),t.q[i].m,t.q[i].a)}})};if(c.w.readyState!=1){c.a.push(f)}else{f()}}PROXY.prototype.__c=function(m,a){var t=this;if(t.c!==void 0){c.n.s1(C.frID(t.c,4),m,a)}else{t.q.push({m:m,a:a})}};';
	var bsm = 'PROXY.prototype.MEMBER=function(){this.__c("MEMBER",arguments)};';
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


