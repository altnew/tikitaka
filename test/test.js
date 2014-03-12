function test(){}

test.prototype.aaa = function() {};
test.prototype.name  = '';

for ( var i in test.prototype ) {
	console.log(i);
}

console.log(typeof(test.aaa));
console.log(typeof(test.name));

