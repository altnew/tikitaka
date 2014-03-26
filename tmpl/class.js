function PROXY() {
	var t = this;
	t.q = [];
	c.n.c("PROXY", function(a){ 
		t.c = a;
		for ( var i in t.q ) c.n.s(a, t.q[i].m, t.q[i].a);
	} );
}

PROXY.prototype.__c = function(m,a) {
	var t = this;
	if (t.c!== void 0) c.n.s(t.c, m, a);
	else t.q.push({m:m,a:a});
}


