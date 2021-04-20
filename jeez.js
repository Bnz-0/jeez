// Copyright (c) 2020 Matteo Benzi <matteo.benzi97@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ============================================================
//
// 1.0.4 — fix Object.gen unwanted exception
// 1.0.3 — new method: String.hashCode
// 1.0.2 — new method: Array.last
// 1.0.1 — fix types definition and vanilla js compatibility
// @bnz-0/jeez 1.0.0 — A personal update of some builtin classes of javascript
//
// https://github.com/Bnz-0/jeez
//

require('date-update');

/** Generate a new Array from another
 *
 * @param value a function that takes the index and the element and return the value to push in the new array
 * @param length the final length of the new array, if `undefined` it continue while there is element in the array
 * @param condition a function that takes the index and the element and returns a boolean to decide to push the value or not, by default it returns always true
 *
 * @example [].gen((i,x) => i*2, 5, (i,x) => i%2==0) // [0, 4, 8, 16, 32]
*/
Array.prototype.gen = function(value = null, length = null, condition = (i,x) => true) {
	if(!value) value = (i,x) => x;
	const g = [];
	let i;
	const goon = length == null ? () => i < this.length : () => g.length < length;
	for(i=0; goon(); i++) {
		if(condition(i, this[i]))
			g.push(value(i, this[i]));
	}
	return g;
}

/** Return the last element of an array
 */
Array.prototype.last = function() {
	return this[this.length-1];
}

/** Generate a new Object form another
 *
 * @param value a function that takes the counter, the key and the value and returns an object to be added in the new object
 * @param length the final number of keys of the new object, if undefined it continues for each key of the object (for performance reason it didn't count the exact number of keys, but the number of time the value() function is called)
 * @param condition a function that takes the counter, the key and the value and returns a boolean to decide to add the value or not, by default it returns always true
 *
 * @example {}.gen((i,k,v) => ({[i]:i*2}), 3, (i,k,v) => i%2==0) // {'0':0, '2':4, '4':8}
*/
Object.prototype.gen = function(value = null, length = null, condition = (i,k,v) => true) {
	if(
		(value && typeof value !== 'function') || // necesary to avoid an annoying error caused by the sharepoint framewor
		(length && typeof length !== 'number') || //  that pass a `value` that isn't a function
		(condition && typeof condition !== 'function')
	) return undefined;

	if(!value) value = (i,k,v) => ({[k]:v}) //NB: this converts keys in string whatever they are before, but in js is fine
	let g = {}, i=0, glen=0;
	const keys = Object.keys(this);
	const goon = length == null ? () => i < keys.length : () => glen < length;
	for(; goon(); i++) {
		if(condition(i, keys[i], this[keys[i]])) {
			Object.assign(g, value(i, keys[i], this[keys[i]]));
			glen++; //NB: glen counts only the number of time the value() function is called, if value() returns an object with more than one key or returns multiple time the same key, the real final "length" will be different
		}
	}
	return g;
}

/** Trim the characters specified inside `chars`
 *
 * @param chars the characters to be trimmed, can be a string or a RegExp
 *
 * @example "(example)".trimChars("()") // "example"
 * @example "0123example45".trimChars(/[0-9]/) // "example"
*/
String.prototype.trimChars = function(chars) {
	const match = chars instanceof RegExp
		? (c) => c.search(chars) !== -1
		: (c) => chars.indexOf(c) !== -1;
	let s = 0, e = this.length;
	for(let i=0; i < this.length && s <= e; i++) {
		const incr_s = s === i && match(this[i]);
		const decr_e = e === this.length-i && match(this[this.length-i-1]);
		if(!incr_s && !decr_e) break;
		s += incr_s;
		e -= decr_e;
	}
	return s < e ? this.substring(s, e) : "";
}

/** Returns a simple, fast but not secure hash from a string
 *
 * implementation taken from: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
