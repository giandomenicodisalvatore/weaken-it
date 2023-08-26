/**
 *
 * 	Weak store
 *
 *  * plain WeakMap, single source of weakness
 * 	* exposed to the user for reuse/inspection
 * 	* guarantees contexts expiry after refs
 *
 */
export const wStore = new WeakMap()

// alias
export { weakenIt as wit }

/**
 *
 * weakenIt - Weak Store with namespaces
 *
 * Store/retrieve values based on a given reference and namespace
 *
 * @alias wit
 *
 * @param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * @param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * @param {any} val - If provided upserts namespace
 * @returns {any} - The stored value
 *
 * @example
 * // Storing a value in the weakenIt store
 * const ref = {},
 * 	namespace = 'example',
 * 	value = 'Hello World'
 *
 * weakenIt(ref, namespace, value)
 * // upsert value
 *
 * weakenIt(ref, namespace)
 * // => 'Hello World'
 *
 * wStore.delete(ref)
 * // hard reset
 *
 */
export function weakenIt(ref, nSpace, val) {
	let ctx = wStore.get(ref)

	if (!(ctx instanceof Map))
		// enforce it's a map
		wStore.set(ref, (ctx = new Map()))

	if (!!nSpace && arguments.length === 3)
		// upsert namespace
		ctx.set(nSpace, val)

	// rely on js errors
	return ctx.get(nSpace)
}
