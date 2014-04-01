
Tikitaka is the data exchange library for Node.js. 
This library enables you to implement a data exchange code like calling a destination object.

Install
-

	npm install tikitaka

How to use
-

The following is the simple example.


* server side

```javascript
var tikitaka = require('tikitaka');
var http = require('http');

var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	}
}).listen(8080, function(){});

function Dog() {}
Dog.prototype.calc = function( arr, f ) {
	var v = 0, r = '';
	for ( var i in arr ) {
		v += parseInt(arr[i]);
	}
	for ( var i=0; i<v; i++ ) {
		r += 'BOW!! ';
	}
	f(r);
}

function Human() {}
Human.prototype.calc = function( arr, f ) {
	f("I can't speak English!!");
}

tikitaka.init(sv, { Dog:Dog, Human:Human } );
```

* client side

```
<script src='http://localhost:8080/test.js'></script>
```


```javascript
var dog, human;
window.addEventListener('load', function() {
	dog = new Dog();
	human = new Human();
});

function test() {
	var arr = [1,2,3];
	dog.calc(arr, function(a){alert(a); });
	human.calc(arr, function(a){alert(a); });
}
```
