var exec = require('child_process').exec,
	fs = require('fs');

var lst = { 'netport.js' : false, 'objstore.js' : false, 'client/proxy.js' : false };
const yuiname = 'yuicompressor-2.4.8.jar';
const spth = 'java -jar lib/' + yuiname + ' ../lib/';
//const dpth = '../tmp/client.js';
const base = '../lib/tikitaka.jspart';
const sfile = '../lib/tikitaka.js';
var buf = '';
var bbuf = null;

function save() {
	for ( var i in lst ) {
		if (!lst[i]) return;
	}
	if (!bbuf) return;
	
	bbuf = bbuf.toString().replace('#####', buf.replace("'", "\\'"));

	fs.writeFile(sfile,bbuf,
		 function(err) {
			 if (err) {
				console.log('failure');
			 } else {
				console.log('succeded');
			 }
		});
}

for ( var i in lst ) {
	+function() {
		var ii = i.toString();
		exec(spth + i , function(err, stdout, stderr) {
			if (!err) {
				buf += stdout.replace(/[a-zA-Z0-9]+\$([a-zA-Z][a-zA-Z0-9]*)/mg, '$1');
				lst[ii] = true;
				save();
			} else {
				console.log(i + ':' + err);
			}
		})
	}();
	fs.readFile(base, function(err, data) {
		if (err) throw err;
		bbuf = data;
		save();
	});
}


