var c = {
	w : new WebSocket('ws://' + location.href.split('/')[2] + '/'),
	r : function(a) {
		if (a.length===1) return a[0];
		var r = [];
		for ( var i=0; i<a.length; i++ ) r.push(a[i]);
		return r
	},
	a : [],
	e : function(a) { }
};
c.s = new O(c);
c.n = new N(c);
c.w.binaryType = 'arraybuffer';
c.w.onopen = function() {
	for ( var i in c.a ) c.a[i]();
}

c.w.onmessage = function(d) {
	try {
		c.n.r(new Uint8Array(d.data));
	} catch (e) {
		c.e(e.error);
	}
}


// c.w.onerror:not implements


