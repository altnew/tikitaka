About
=
Tikitaka is the data exchange library for Node.js. This library enables you to implement a data exchange function like calling a destination object.

Install
=
	npm install tikitaka


How to use
=

In order to use this library, you must implements following details in your source codes.

server-side 
-

* import tikitaka

```javascript
var tikitaka = require('tikitaka');
```

* prepare function as http server


```javascript
var http = require('http');
var fs = require('fs');

var sv = http.createServer(function(req,res) {
	if (req.url=='/') {
		fs.readFile('index.html', function(err, data) 
		{
			res.end(data);
		});
	}
}).listen(8080, function(){});

```


* prepare classes that opens to client

```javascript
function Dog() {
}

Dog.prototype.calc = function( arr, f ) {
	console.log('Dog.calc');
	var v = 0, r = '';
	for ( var i in arr ) {
		v += parseInt(arr[i]);
	}
	for ( var i=0; i<v; i++ ) {
		r += 'BOW!! ';
	}
	f(r);
}

function Human() {
}

Human.prototype.calc = function( arr, f ) {
	console.log('Human.calc');
	f("I Can't speak English!!");
}

```

* assign following valuable to tikitaka

 - instance of http module 

 - classes to open to client 

```javascript
tikitaka.init(sv, { Dog:Dog, Human:Human } );
```


* prepare response to client request about javascript that made by tikitaka 

```javascript
var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	} 
    ...
```


client-side
-

* prepare loading javascript that made by tikitaka

```
<script src='http://localhost:8080/test.js'></script>
```

* implements codes that uses server classes

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



