function PROXY() {
	var t = this;
	t.q = [];
	var f = function() {
		c.n.s3("PROXY", function(a){ 
			t.c = a;
			for ( var i in t.q ) c.n.s1(C.frID(a,4), t.q[i].m, t.q[i].a);
		} 
	)};
	if (c.w.readyState!=1) c.a.push(f);
	else f();
}

PROXY.prototype.__c = function(m,a) {
	var t = this;
	if (t.c!== void 0) c.n.s1(C.frID(t.c,4), m, a);
	else t.q.push({m:m,a:a});
}


