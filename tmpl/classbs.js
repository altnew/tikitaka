var r = false;
var c = {
	s : new O(),
	w : new WebSocket('ws://URL'),
	r : function(a) {
		if (a.length===1) return a[0];
		var r = [];
		for ( var i=0; i<a.length; i++ ) r.push(a[i]);
		return r
	},
	e : function(a,b) { alert(a + ':' + b); }
};
c.n = new N(c);

c.w.onopen = function() {
	r = true;
}

c.w.onmessage = function(d) {
	c.n.r(d.data);
}

// c.w.onerror:not implements


