import type { NSpaceType, RefType, CtxType } from '@lib'
import { wStore, wit } from '@lib'

/**
 *
 * 	Delete context for ref
 *
 * 	* prevents context reuse
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@returns void
 *
 */
export function wDel(ref: RefType) {
	wStore.delete(ref as object)
}

/**
 *
 * 	Retrieve full context
 *
 * 	* allows **direct access** to all data stored for ref
 * 	* any non-string key may be hidden or unaccessible
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@returns - The stored context, or user-managed data
 *
 */
export function wCtx(ref: RefType): CtxType | unknown {
	return wStore.get(ref as object)
}

/**
 *
 * 	Cast full context as object
 *
 * 	* it casts a **copy** of ref's associated context as an object
 * 	* any non-string key may be hidden or unaccessible
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@returns - The stored context as object, or user-managed data
 *
 */
export function wCast(ref: RefType) {
	return Object.fromEntries(wStore.get(ref as object) ?? [])
}

/**
 *
 * 	Upsert, but **only if nullish**
 *
 * 	* prevents overriding non-nullish data
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@param nSpace - Namespace, must be any non-falsy value
 * 	@param val - If provided and stored value is nullish, upserts namespace
 * 	@returns - The stored value
 */
export function wSure(
	ref: RefType,
	nSpace: NSpaceType,
	val: any,
): typeof val | unknown {
	return wit(ref, nSpace) ?? wit(ref, nSpace, val)
}

/**
 *
 * 	Creates an Array store at ref/nSpace
 *
 *	* a plain array, ready to be garbage collected
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@param nSpace - Namespace, must be any non-falsy value
 * 	@returns - The new array store
 *
 */
export function wArr(ref: RefType, nSpace: NSpaceType) {
	return wit(ref, nSpace, [])
}

/**
 *
 * 	Creates an Object store at ref/nSpace
 *
 *	* a plain object, ready to be garbage collected
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@param nSpace - Namespace, must be any non-falsy value
 * 	@returns - The new object store
 *
 */
export function wObj(ref: RefType, nSpace: NSpaceType) {
	return wit(ref, nSpace, {})
}

/**
 *
 * 	Creates a Key-value store at ref/nSpace
 *
 *	* Object.create(null), ready to be garbage collected
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@param nSpace - Namespace, must be any non-falsy value
 * 	@returns - The new object store
 *
 */
export function wKV(ref: RefType, nSpace: NSpaceType) {
	return wit(ref, nSpace, Object.create(null))
}

/**
 *
 * 	Creates a Set store at ref/nSpace
 *
 *	* Set, ready to be garbage collected
 *	* cheap *iterability* instead of WeaksSet
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@param nSpace - Namespace, must be any non-falsy value
 * 	@returns - The new Set store
 *
 */
export function wSet(ref: RefType, nSpace: NSpaceType) {
	return wit(ref, nSpace, new Set())
}

/**
 *
 * 	Creates a Map store at ref/nSpace
 *
 *	* Map, ready to be garbage collected
 *	* cheap *iterability* instead of WeaksMap
 *
 * 	@param ref - Reference, must be an instance or a Symbol
 * 	@param nSpace - Namespace, must be any non-falsy value
 * 	@returns - The new Map store
 *
 */
export function wMap(ref: RefType, nSpace: NSpaceType) {
	return wit(ref, nSpace, new Map())
}
