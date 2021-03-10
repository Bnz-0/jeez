# jeez — a personal update of some builtin classes of javascript

## Installation
```bash
$ npm i @bnz-0/jeez
```
```javascript
require('@bnz-0/jeez');
```

## Added methods

- **Array.gen**:
	```typescript
	gen<V>(value?: (i: number, x: T) => V, length?: number, condition?: (i: number, x: T) => boolean): V[];
	```
	Generate a new Array from another
	- **value**: a function that takes the index and the element and return the value to push in the new array
	- **length**: the final length of the new array, if `undefined` it continue while there is element in the array
	- **condition**: a function that takes the index and the element and returns a boolean to decide to push the value or not, by default it returns always true
	> Examples:
	> ```javascript
	> [].gen((i,x) => i*2, 5, (i,x) => i%2==0) // [0, 4, 8, 16, 32]
	> [10,20,30,40,50,60,70].gen((i,x) => x/10, 5) // [1, 2, 3, 4, 5]
	> [].gen((i) => i*i, 5, (i) => i%10===0) // [0, 100, 400, 900, 1600]
	> ```

- **Array.last**:
	```typescript
	last(): T|undefined;
	```
	Return the last element of an array
	> Examples:
	> ```javascript
	> [1,2,3].last() // 3
	> [].last() // undefined
	> ```

- **Objects.gen**:
	```typescript
	gen<V>(value?: (i: number, k: string|number|symbol, v: any) => Record<string|number|symbol,V>, length?: number, condition?: (i: number, k: string|number|symbol, v: any) => boolean): Record<string|number|symbol,V>;
	```
	Generate a new Object form another
	- **value**: a function that takes the counter, the key and the value and returns an object to be added in the new object
	- **length**: the final number of keys of the new object, if undefined it continues for each key of the object (for performance reason it didn't count the exact number of keys, but the number of time the value() function is called)
	- **condition**: a function that takes the counter, the key and the value and returns a boolean to decide to add the value or not, by default it returns always true
	> Example:
	> ```javascript
	> {}.gen((i,k,v) => ({[i]:i*2}), 3, (i,k,v) => i%2==0) // {'0':0, '2':4, '4':8}
	> {
	> 	one:1,
	> 	two:2,
	> 	three:3
	> }.gen((i,k,v) => ({[v]:k})); // {'1':'one', '2':'two', '3':'three'}
	> ```

- **String.trimChars**:
	```typescript
	trimChars(chars: string|RegExp): string;
	```
	Trim the characters specified inside `chars`
	- **chars**: the characters to be trimmed, can be a string or a RegExp
	> Examples:
	> ```javascript
	> "(example)".trimChars("()") // "example"
	> "0123example45".trimChars(/[0-9]/) // "example"
	> ```

- **String.hashCode**:
	```typescript
	hashCode(): number;
	```
	Returns a simple, fast but not secure hash from a string
	> Examples:
	> ```javascript
	> "jeez".hashCode() // 3258160
	> ```

## Examples

See [test.js](./tests.js) to see some example of usage.

## Why?
Because yes.

... and because I'm not really satisfied by the builtin methods of js' classes, so
I decided to extend them with some methods that I feel are useful for the way I work.

