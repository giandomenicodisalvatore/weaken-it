/**
 * 	WeakStore
 *
 *  * stores all the weakness
 * 	* guarantees contexts expire after refs
 */
export const WeakStore = new WeakMap()

/**
 * 	Use a namespaced store
 *
 * 	* any namespaced value will never outlive ref
 * 	* ref must be an instance or a Symbol()
 * 	* namespace can be any map-key compatible value
 * 	* reuses same context as much as possible
 */
export function weakenIt(ref, namespace, value) {
	if (!WeakStore.has(ref))
		// init a new context
		WeakStore.set(ref, new Map())

	if (arguments.length === 3)
		// only set if called with value
		WeakStore.get(ref).set(namespace, value)

	return WeakStore.get(ref).get(namespace)
}
