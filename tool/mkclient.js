var exec = require('child_process').exec,
	fs = require('fs');

var lst = { 'netport.js' : false, 'objstore.js' : false };
const yuiname = 'yuicompressor-2.4.8.jar';
const spth = 'java -jar lib/' + yuiname + ' ../lib/';
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

exec(spth + 'client/proxy.js', function(err, stdout, stderr) {
	if (!err) {
		stdout = stdout.replace(/[a-zA-Z0-9]+\$([a-zA-Z][a-zA-Z0-9]*)/mg, '$1');
		fs.writeFile('../tmp/proxy.min.js',stdout,
		 function(err) {
			 if (err) {
				console.log('failure to save proxy.js');
			 } else {
				console.log('succeded to save proxy.js');
			 }
		});
	} else {
		console.log(i + ':' + err);
	}
})

