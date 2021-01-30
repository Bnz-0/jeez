/* A very simple test script */

require('./jeez');
const assert = require('assert');

function arrayEqual(a1, a2) {
	if(a1.length != a2.length) return false;
	for(let i=0; i<a1.length; i++)
		if(a1[i] !== a2[i]) return false;
	return true;
}

function objectEqual(o1,o2){
	for(let k in o1)
		if(o1[k] !== o2[k]) return false;
	for(let k in o2)
		if(o1[k] !== o2[k]) return false;
	return true;
}


// import test
assert(!!new Date().trim && !!new Date().add);

// Array.gen tests
a1 = [].gen((i) => i+1, 5);
a2 = [10,20,30,40,50,60,70].gen((i,x) => x/10, 5);
a3 = ['a','z','p','j','e','k','j','m','e','v'].gen(null, null, (i,x) => x<'k');
a4 = ['a','z','p','j','e','k','j','m','e','a'].gen(null, 5, (i,x) => x<'k');
a5 = [].gen((i) => i*i, 5, (i) => i%10===0);
a6 = a1.gen();

assert(arrayEqual(a1, [1,2,3,4,5]));
assert(arrayEqual(a1, a2));
assert(arrayEqual(a3, ['a','j','e','j','e']));
assert(arrayEqual(a3, a4));
assert(arrayEqual(a5, [0,100,400,900,1600]));
assert(a6 !== a1 && arrayEqual(a6,a1));

// Object.gen tests
o1 = {}.gen((i) => ({[i]:i}), 3);
o2 = {}.gen((i) => ({[i+1]:i*2}), 2, (i) => i.toString()[0]==='3');
o3 = {
	one:1,
	two:2,
	three:3
}.gen((i,k,v) => ({[v]:k}));
o4 = {
	one:1,
	two:2,
	three:3,
	four:4,
	five:5,
}.gen((i,k,v) => ({[v]:k}), 2, (i,k,v) => v%2==1);
o5 = o4.gen();

assert(objectEqual(o1, {'0':0, '1':1, '2':2}));
assert(objectEqual(o2, {'4':6, '31':60}));
assert(objectEqual(o3, {'1':'one', '2':'two', '3':'three'}));
assert(objectEqual(o4, {'1':'one', '3':'three'}));
assert(o5 !== o4 && objectEqual(o5,o4));

// String.trimChars tests
assert("test".trimChars('t') === "es");
assert("test".trimChars('es') === "test");
assert("test".trimChars('te') === "s");
assert("test".trimChars('abc') === "test");
assert("test".trimChars('') === "test");
assert("test".trimChars('est') === "");
assert("t3st".trimChars(/[a-z]/) === "3");
assert("t3st".trimChars(/[A-Z0-9]/) === "t3st");
assert("\tt3st \n".trimChars(/\s/) === "t3st");
assert("".trimChars('') === "");

console.log('all tests passed');
