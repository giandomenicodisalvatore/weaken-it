import { wSure, wit } from '..'

/**
 *
 * 	Create a memoized function
 *
 * 	wMemo defaults to JSON.stringify, however, you can provide a custom serialization function.
 * 	It caches even itself, to prevent creating additional closures.
 * 	You can manually clear the cache for a specific function by using `wStore.delete(fn)` or `wDel(fn)`.
 *
 * 	@param {Function} fn - The function to be memoized
 * 	@param {Function} [serialize=JSON.stringify] - Receives array of arguments to convert into a unique string.
 * 	@returns {Function} - The memoized version of the function.
 *
 * 	@example
 *
 * 	function expensiveFn(...num) {
 * 		console.log('Time-consuming...')
 * 		return Math.max(...num)
 * 	}
 *
 * 	// Memoized fn
 * 	const memoized = wMemo(expensiveFn)
 * 	console.log(memoized(1,5)) // Time-consuming... 5
 * 	console.log(memoized(1,5)) // 5 (cached)
 *
 * 	// Custom serialization
 * 	const customSerialize = (args) => args.join('-')
 * 	const memoized2 = wMemo(expensiveFn, customSerialize)
 * 	console.log(memoized2(5, 10)) // Time-consuming... 10
 * 	console.log(memoized2(5, 10)) // 10 (cached)
 *
 * 	// clear the cache for expensiveFn
 * 	wDel(expensiveFn) // or wStore.delete(expensiveFn)
 *
 */
export function wMemo(fn, serialize = JSON.stringify) {
	const cache = new Map(),
		memoized = (...args) => {
			const key = serialize(args)

			if (!cache.has(key))
				// store once
				cache.set(key, fn.apply(undefined, args))

			return cache.get(key)
		}
	// init or upsert, clearable
	return wSure(fn, serialize, memoized)
}
