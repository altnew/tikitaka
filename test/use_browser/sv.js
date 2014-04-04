var tikitaka = require('../../lib/tikitaka');
var http = require('http');
var fs = require('fs');

tikitaka.log = function( l, c, o ) {
	console.log(l + ':' + tikitaka.getMessage(c) + ':' + o?o.toString():'');
}


var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	} else if (req.url=='/') {
		fs.readFile('index.html', function(err, data) {
			res.end(data);
		});
	}
}).listen(8080, function(){});

/**
 * @class Test1
 * @description Function parameter
 */
function Test1() {}

Test1.prototype.test = function(f1) {
	f1(function(f2) {
		f2(function(f3){
			f3();
		});
	});
}

/**
 * @class Test2
 * @description Object parameter
 */
function Test2() {}

Test2.prototype.test = function(o1) {
	o1.func1({
		param2 : o1.param1,
		func2 : function(o2) {
			o2.func3(o2.param3);
		}
	});
}

/**
 * @class Test3_4
 * @description Plural parameters and functions
 */
function Test3_4(){}

Test3_4.prototype.test3 = function(v1, v2, f) {
	v1 = v1+v1;
	v2 = v2+v2;
	f(v1,v2);
}

Test3_4.prototype.test4 = function(v1, v2, v3,f) {
	v1 = v1+v1+v1;
	v2 = v2+v2+v2;
	v3 = v3+v3+v3
	f(v1,v2,v3);
}

/**
 * @class Test5
 * @description Binary parameter
 */
function Test5(){}
Test5.prototype.test = function(v, f) {
	f(v);
}


/**
 * @class Test6
 * @description Multilevel object parameter
 */
function Test6(){}
Test6.prototype.test = function(p) {
	var a = p.a;
	console.log(typeof(a.f));
	p.a.f(
		{
			a : {
				b : p.c
			},
			c : p.a.b
		}
	);
}


tikitaka.init(sv, { Test1:Test1, Test2:Test2, Test3_4:Test3_4, Test5:Test5, Test6:Test6 } );
