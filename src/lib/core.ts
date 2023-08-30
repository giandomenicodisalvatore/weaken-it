/**
 *
 * Weak Store
 *
 * A plain WeakMap to store all contexts and for the management of weak references.
 * It guarantees that everything will be eligible for garbage collection once no other references exist.
 * It is exposed for reusability.
 *
 * @example
 *
 * import { wStore } from './wStore.js';
 *
 * // Setting a weak reference in the store
 * const obj = {}
 * wStore.set(obj, 'some-value')
 *
 * // Getting a weak reference from the store
 * const value = wStore.get(obj)
 *
 * // Checking if a weak reference exists in the store
 * const hasReference = wStore.has(obj)
 *
 * // Removing a weak reference from the store
 * wStore.delete(obj)
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
 * @param ref - Reference, must be an instance or a Symbol
 * @param nSpace - Namespace, must be any non-falsy value
 * @param val - If provided upserts namespace
 * @returns - The stored value
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
export function weakenIt<R extends RefType, N extends NSpaceType, V>(
	ref: R,
	nSpace: N,
	val?: any,
): typeof val

export function weakenIt(ref: any, nSpace: any, val: any) {
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

export type RefType = object | symbol

export type NSpaceType = RefType | string | number

export type CtxType = Map<NSpaceType, any>
