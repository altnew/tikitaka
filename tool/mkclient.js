var exec = require('child_process').exec,
	fs = require('fs');

var lst = { 
	'../lib/netport.js' : false, 
	'../lib/objstore.js' : false,
	'../lib/uint8conv.js' : false,
	isReady : function() {
		for ( var i in this ) if (this[i]===false) return false;
		return true;
	}
};
const yuiname = 'yuicompressor-2.4.8.jar';
const spth = 'java -jar lib/' + yuiname + ' --nomunge ';
const base = '../tmpl/tikitaka.base.js';
const sfile = '../lib/tikitaka.js';
var buf = '';
var bbuf = null;

var reps = {
	'#####' : {pth:null, buf:null},
	'$$$$$' : {pth:'../tmpl/classbs.js', buf:null},
	'@@@@@' : {pth:'../tmpl/class.js', buf:null},
	'&&&&&' : {pth:'../tmpl/method.js', buf:null},
	isReady : function() {
		for ( var i in this ) if (this[i].buf===null) return false;
		return true;
	}
};

function save() {
	if (!reps.isReady()) return;
	if (!bbuf) return;

	for ( var i in reps ) {
		if (i!='isReady') bbuf = bbuf.replace(i,reps[i].buf);
	}
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
	if (i=='isReady') continue;
	+function(ii) {
		console.log(spth+ii);
		exec(spth + ii , function(err, stdout, stderr) {
			if (!err) {
				buf += stdout.replace(/[a-zA-Z0-9]+\$([a-zA-Z][a-zA-Z0-9]*)/mg, '$1')
					         .replace(/[ \r\n]*\/\*! ,,,[\s\S]*?``` \*\/[ \r\n]*/mg, "")
							 .replace(/__TLOG\([^\)]*\);/mg,"")
                             .replace(/\\\\/mg,"\\\\\\\\").replace(/'/mg, "\\'");
			lst[ii] = true;
				if (lst.isReady()) {
					reps['#####'].buf = buf;
					save();
				}
			} else {
				console.log(ii + ':' + err);
			}
		})
	}(i);
}

console.log(base);
fs.readFile(base, function(err, data) {
	if (err) throw err;
	bbuf = data.toString();
	save();
});

for ( var i in reps ) {
	if (i=='isReady') continue;
	+function(ii) {
		if (reps[ii].pth===null) return;
		console.log(spth + reps[ii].pth);
		exec(spth + reps[ii].pth , function(err, stdout, stderr) {
			if (!err) {
				reps[ii].buf = stdout.replace(/[a-zA-Z0-9]+\$([a-zA-Z][a-zA-Z0-9]*)/mg, '$1');
				save();
			} else {
				console.log(ii + ':' + err);
			}
		})
	}(i);
}


