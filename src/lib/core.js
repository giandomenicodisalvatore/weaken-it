/**
 * 	# WeakSrc
 *
 *  * source of all the weakness
 * 	* iterable over known refs
 * 	* exported for reuse
 */
export const WeakSrc = new WeakMap()

/**
 * 	# Set key-val once
 *
 * 	* works with Map, WeakMap
 * 	* set key-val pairs on maps just once
 * 	* guarantees value reuse from same key in maps
 * 	* returns first value received
 * 	* exported as a courtesy
 */
export const setMapOnce = (map, key, val) =>
	(!map?.has(key) ? map?.set(key, val) : map)?.get(key)

/**
 * 	# Returns a weakend value instance
 *
 * 	* any value will never outlive ref
 * 	* it always returns first value
 * 	* namespace maybe any primitive or instance
 * 	* if namespace is an instance, val expires with it
 * 	* one-off usage via nullish ref / namespace
 */
export const weakenIt = (ref, namespace, value) => {
	// create weak context for ref
	const ctx = setMapOnce(WeakSrc, (ref ??= Symbol()), new Map())
	// create namespace and save value
	setMapOnce(ctx, (namespace ??= Symbol()), value)
	// if unknown ref-namespace or expired ref
	return WeakSrc?.get(ref)?.get(namespace)
}
