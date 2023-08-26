import { wSure } from '..'

/**
 * 	# Memoize a function
 *
 *	* serialize function defaults to JSON.stringify
 *	* memoizes itself for reuse, when possible
 *	*	hard reset via wStore.delete(fn) or wDel(fn)
 */
export function wMemo(fn, serialize = JSON.stringify) {
	const memory = Symbol()
	// allows closure reuse and external clearing
	return wSure(fn, serialize, (...args) => {
		const key = serialize(args)

		if (!memory.has(key))
			// only run once
			memory.set(key, fn.apply(undefined, args))

		return memory.get(key)
	})
}
