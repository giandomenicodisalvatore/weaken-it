import { setMapOnce, weakenIt } from './core'

/**
 * 	# Memoizing function
 *
 * 	* cache will never outlive ref
 *  * this should help memoize class methods
 * 	* memoizes itself where possible
 * 	* one-off caching via nullish ref
 * 	* fn may access ctx/this via weakenIt
 */
export const weakMemo = (fn, serialize = JSON.stringify) => {
	// same ref + fn = same cache + memoFn
	const cache = weakenIt(ref, fn, new Map())
	return weakenIt(cache, serialize, (...args) => {
		const key = serialize(args)
		return !cache?.has(key)
			? setMapOnce(cache, key, fn?.apply(undefined, args))
			: cache.get(cache, key)
	})
}
