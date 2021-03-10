// Type definition for jeez

export {};

declare global {
	interface Array<T> {
		/** Generate a new Array from another
		 *
		 * @param value a function that takes the index and the element and return the value to push in the new array
		 * @param length the final length of the new array, if `undefined` it continue while there is element in the array
		 * @param condition a function that takes the index and the element and returns a boolean to decide to push the value or not, by default it returns always true
		 *
		 * @example [].gen((i,x) => i*2, 5, (i,x) => i%2==0) // [0, 4, 8, 16, 32]
		*/
		gen<V>(value?: (i: number, x: T) => V, length?: number, condition?: (i: number, x: T) => boolean): V[];

		/** Return the last element of an array
		*/
		last(): T|undefined;
	}

	interface Object {
		/** Generate a new Object form another
		 *
		 * @param value a function that takes the counter, the key and the value and returns an object to be added in the new object
		 * @param length the final number of keys of the new object, if undefined it continues for each key of the object (for performance reason it didn't count the exact number of keys, but the number of time the value() function is called)
		 * @param condition a function that takes the counter, the key and the value and returns a boolean to decide to add the value or not, by default it returns always true
		 *
		 * @example {}.gen((i,k,v) => ({[i]:i*2}), 3, (i,k,v) => i%2==0) // {'0':0, '2':4, '4':8}
		*/
		gen<V>(value?: (i: number, k: string|number|symbol, v: any) => Record<string|number|symbol,V>, length?: number, condition?: (i: number, k: string|number|symbol, v: any) => boolean): Record<string|number|symbol,V>;
	}

	interface String {
		/** Trim the characters specified inside `chars`
		 *
		 * @param chars the characters to be trimmed, can be a string or a RegExp
		 *
		 * @example "(example)".trimChars("()") // "example"
		 * @example "0123example45".trimChars(/[0-9]/) // "example"
		*/
		trimChars(chars: string|RegExp): string;
	}
}
