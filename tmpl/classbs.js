var c = {
	s : new O(),
	w : new WebSocket('ws://URL'),
	r : function(a) {
		if (a.length===1) return a[0];
		var r = [];
		for ( var i=0; i<a.length; i++ ) r.push(a[i]);
		return r
	},
	a : [],
	e : function(a,b) { alert(a + ':' + b); }
};
c.n = new N(c);
c.w.binaryType = 'arraybuffer';
c.w.onopen = function() {
	for ( var i in c.a ) c.a[i]();
}

c.w.onmessage = function(d) {
	c.n.r(new Uint8Array(d.data));
}

// c.w.onerror:not implements


