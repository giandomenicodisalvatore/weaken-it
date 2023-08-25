import { weakenIt } from '..'

/**
 * 	# Memoize a function
 *
 *	* serialize function defaults to JSON.stringify
 *	* memoizes itself for reuse, when possible
 *	*	reset via wStore.delete(fn)
 */
export function wMemo(fn, serialize) {
	// allows reuse and external clearing
	let memoized = weakenIt(fn, serialize),
		memory = new Map()

	// new closure if not found
	memoized ??= (...args) => {
		const key = serialize(args)

		if (!memory.has(key))
			// only run once
			memory.set(key, fn.apply(undefined, args))

		return memory.get(key)
	}

	// save for reuse
	return weakenIt(fn, serialize, memoized)
}
