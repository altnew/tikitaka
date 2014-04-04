About
=
Tikitaka is the data exchange library for Node.js. This library provides a data exchange functionality which enables client side JavaScript to call server function dynamically.

Install
=
	npm install tikitaka


How to use
=

In order to use this library, you must implement following details in your source codes.

Server-side 
-

* Import tikitaka

```javascript
var tikitaka = require('tikitaka');
```

* Prepare function as http server


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


* Prepare classes that opens to client

```javascript
function Dog() {
}

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

function Human() {
}

Human.prototype.calc = function( arr, f ) {
	f("I Can't speak English!!");
}

```

* Assign following valuable to tikitaka

 - Instance of http module 

 - Classes to open to client 

```javascript
tikitaka.init(sv, { Dog:Dog, Human:Human } );
```


* Prepare response to client request about javascript that made by tikitaka 

```javascript
var sv = http.createServer(function(req,res) {
	if (req.url=='/test.js') {
		res.end(tikitaka.getScript());
	} 
    ...
```


Client-side
-

* Prepare loading javascript that made by tikitaka

```
<script src='http://localhost:8080/test.js'></script>
```

* Implement codes that uses server classes

```javascript
window.addEventListener('load', function() {
    var dog, human,
        arr = [1,2,3];
    dog = new Dog();
    human = new Human();
    dog.calc(arr, function(a){alert(a); });
    human.calc(arr, function(a){alert(a); });
});




