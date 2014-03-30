
/**
 * @method __TLOG
 * @memberOf Global
 * @param txt log data
 */
Function('return this')().__TLOG = function(t, txt) {
	console.log(t + ':' +  txt ? (txt.toString ? txt.toString() : txt) : '');
}
