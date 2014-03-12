var http = require('http');
var WSServer = require('websocket').server;
var url = require('url');
var clientHtml = require('fs').readFileSync('client.html');

var Tikitaka = require('../lib/tikitaka.js'); 

var tikitaka = new Tikitaka('127.0.0.1');

function monkey() {}
monkey.prototype.name = 'monkey';
monkey.prototype.laugh = function() { console.log('monkey.laugth') };
monkey.prototype.glin = function() { console.log('monkey.glin') };

function chimp() {}
chimp.prototype.giggle = function() { console.log('chimp.giggle') };
chimp.prototype.guffaw = function() { console.log('chimp.guffaw') };

tikitaka.set([monkey, chimp]);

var httpServer = http.createServer(function(req,res) {
	if (!tikitaka.setStub(req,res)) {
		res.writeHead(200, { 'Content-Type': 'text/html'});
		res.end(clientHtml);
	}
}).listen(8080);

var webSockServer = new WSServer({httpServer:httpServer});

var accept = ['localhost', '127.0.0.1'];

webSockServer.on('request', function (req) {
	req.origin = req.origin || '*';
	if (accept.indexOf(url.parse(req.origin).hostname) === -1) {
		req.reject();
		console.log(req.origin + ' access not allowed.');
		return;
	}
	
	var websocket = req.accept(null, req.origin);
	var session = tikitaka.getInstance(websocket, req);
	if (!session) {
		console.log('close');
		websocket.close();
		return;
	}

	websocket.on('message', function(msg) {
		session.receive(msg);
	});

	websocket.on('close', function (code,desc) {
		console.log('test');
		session.terminate();
	});
});

