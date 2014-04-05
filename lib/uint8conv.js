/*! ,,, */
module.exports =
/*! ``` */
C = {

	/**
	 * @method frID
	 * @memberOf uint8conv
	 * @param {Number} d data
	 * @param {Number} l data length
	 * @return {Uint8Array} converted data
	 */
	frID : function(d,l) {
		if (!l) return;
		var r = new Uint8Array(l);
		for ( var i=l; i>0; i-- ) {
			r[i-1] = d & 0xff;
			d = d >>> 8;
		}
		return r;
	},

	/**
	 * @method toID
	 * @memberOf uint8conv
	 * @param {Uint8Array} d data
	 * @return {Number}
	 */
	toID : function(d) {
		var r = 0;
		for ( var i=0; i<d.length; i++ ) {
			r = r << 8;
			r += d[i];
		}
		return r;
	},

//	/**
//	 * @method frN
//	 * @memberOf uint8conv
//	 * @param {Number} d data
//	 * @return {Uint8Array} converted data
//	 * @description 64bit binary format IEEE 754 value
//	 *              seeeeeee efffffff ffffffff ffffffff
//	 */
//	frN : function(d) {
//		if (Number.isNaN(d)) return new Uint8Array([0x7f,0x80,0,0,0,0,0,1]);
//		else if (!Number.isFinite(d)) return new Uint8Array([0x7f,0x80,0,0,0,0,0,0]);
//		var s = (d<0)<<7,
//		    e, r = new Uint8Array(8),
//			s = function(v) {
//				for ( var i=7; i>0; i--) { // fraction is 23 bits
//					r[i] = v&0xff;
//					console.log(v);
//					v = v>>>8;
//				}
//			};
//		if (Number.isNaN(d)) return new Uint8Array([0x7f,0x80,0,0,0,0,0,1]);
//		else if (!Number.isFinite(d)) return new Uint8Array([0x7f,0x80,0,0,0,0,0,0]);
//		//if (d===(d|0)) {
//		//	e = 0; s(d);
//		//} else {
//			e = String(d);
//			if (e.match(/[\.]*\.[\.]*/)) { // X.XX
//				e = e.split('.');
//				s(e[0]+e[1]);
//				e = e[1].length;
//			} else { // Xe-X
//				e = /([0-9]*)e\-([0-9]*)/.exec(e);
//				if (e===null) {
//					e = 0;
//					s(d);
//				} else {
//					s(e[1]);
//					e = parseInt(e[2]);
//				}
//			}
//		//}
//		r[0] = s | (e>>>1);
//		r[1] = r[1] | (e&1)<<7;
//		return r;
//	},
//
//	/**
//	 * @method toN
//	 * @memberOf uint8conv
//	 * @param {Uint8Array} d data
//	 * @return {Number} converted data
//	 */
//	toN : function(d) {
//		if (d[0]===0x7f) {
//			return (d[7]===1) ? NaN : Infinity;
//		}
//		var s = d[0]>>>7,
//		    e = d[0]<<1|d[1]>>>7, f=0;
//		d[1]=d[1]&0x7f;
//		for (var i=1; i<8; i++ ) {
//			f = f<<8|d[i];
//		}
//		if (e===0) return f;
//		d = String(f);
//		return parseInt(d.substr(0,d.length-e) + '.' + d.substr(-e));
//	},

	
	/**
	 * @method toS
	 * @memberOf uint8conv
	 * @param {Uint8Array} d
	 * @return {String}
	 */
	toS : function(d) {
		var out='', i=0, len, c, cs4,
			c0_7 = function() { out += String.fromCharCode(c) },// 0xxxxxxx
			c12_13 = function() { // 110x xxxx   10xx xxxx
				out += String.fromCharCode(((c & 0x1F) << 6) | (d[i++] & 0x3F)); },
			c14 = function() {  // 1110 xxxx  10xx xxxx  10xx xxxx
				out += String.fromCharCode(((c & 0x0F) << 12) |
					((d[i++] & 0x3F) << 6) | (d[i++] & 0x3F) ); },
			cv = { 0:c0_7,1:c0_7,2:c0_7,3:c0_7,4:c0_7,5:c0_7,6:c0_7,7:c0_7,
				   12:c12_13, 13:c12_13, 14:c14 };
		while(i < d.length) {
			c = d[i++];
			cs4 = cv[c>>4];
			cs4&&cs4();
		}
		return out;
	},

	/**
	 * @method frS
	 * @memberOf unit8conv
	 * @param {String} d
	 * @return {Uint8Array}
	 */
	frS : function(d) {
		var idx = -1,
			bytes = _bytes = new Uint8Array(512),
			byteLength = bytes.byteLength,
			c;
		for(var i = 0; i < d.length; ++i){
			c = d.charCodeAt(i);
			if(c <= 0x7F){
				bytes[++idx] = c;
			} else if(c <= 0x7FF){
				bytes[++idx] = 0xC0 | (c >>> 6);
				bytes[++idx] = 0x80 | (c & 0x3F);
			} else if(c <= 0xFFFF){
				bytes[++idx] = 0xE0 | (c >>> 12);
				bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
				bytes[++idx] = 0x80 | (c & 0x3F);
			} else {
				bytes[++idx] = 0xF0 | (c >>> 18);
				bytes[++idx] = 0x80 | ((c >>> 12) & 0x3F);
				bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
				bytes[++idx] = 0x80 | (c & 0x3F);
			}
			if(byteLength - idx <= 4){
				byteLength *= 2;
				_bytes = new Uint8Array(byteLength);
				_bytes.set(bytes);
				bytes = _bytes;
			}
		}
		return new Uint8Array(bytes.subarray(0, ++idx));
	}
};
