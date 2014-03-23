var r = false;
var c = {
	n : new N(c),
	s : new O(),
	w : new WebSocket('wss://URL:PORT/NAME')
};

c.w.onopen = function() {
	r = true;
}

c.w.onmessage = function(d) {
	c.n.r(d.utf8Data);
}

// c.w.onerror:not implements


function PROXY() {
	var t = this;
	c.n.c(arguments.callee.name, function(c){ t.c = c } );
}

PROXY.prototype.MEMBER = function() {
	c.n.s(this.c, MEMBER, arguments);
};


