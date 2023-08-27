import { wStore, wit } from '..'

/**
 *
 * 	Delete context for ref
 *
 * 	* prevents context reuse
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@returns {void}
 *
 */
export const wDel = ref => void wStore.delete(ref)

/**
 *
 * 	Retrieve full context
 *
 * 	* allows **direct access** to all data stored for ref
 * 	* any non-string key may be hidden or unaccessible
 *
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@returns {Map|unknown} - The stored context, or user-managed data
 *
 */
export const wCtx = ref => wStore.get(ref)

/**
 *
 * 	Cast full context as object
 *
 * 	* it casts a **copy** of ref's associated context as an object
 * 	* any non-string key may be hidden or unaccessible
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@returns {object} - The stored context as object, or user-managed data
 *
 */
export const wCast = ref => Object.fromEntries(wStore.get(ref) ?? [])

/**
 *
 * 	Upsert, but **only if nullish**
 *
 * 	* prevents overriding non-nullish data
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * 	@param {any} val - If provided and stored value is nullish, upserts namespace
 * 	@returns {any} - The stored value
 */
export const wSure = (ref, nSpace, val) =>
	wit(ref, nSpace) ?? wit(ref, nSpace, val)

/**
 *
 * 	Creates an Array store at ref/nSpace
 *
 *	* a plain array, ready to be garbage collected
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * 	@returns {any[]} - The new array store
 *
 */
export const wArr = (ref, nSpace) => wit(ref, nSpace, [])

/**
 *
 * 	Creates an Object store at ref/nSpace
 *
 *	* a plain object, ready to be garbage collected
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * 	@returns {object} - The new object store
 *
 */
export const wObj = (ref, nSpace) => wit(ref, nSpace, {})

/**
 *
 * 	Creates a Key-value store at ref/nSpace
 *
 *	* Object.create(null), ready to be garbage collected
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * 	@returns {object} - The new object store
 *
 */
export const wKV = (ref, nSpace) => wit(ref, nSpace, Object.create(null))

/**
 *
 * 	Creates a Set store at ref/nSpace
 *
 *	* Set, ready to be garbage collected
 *	* cheap *iterability* instead of WeaksSet
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * 	@returns {object} - The new Set store
 *
 */
export const wSet = (ref, nSpace) => wit(ref, nSpace, new Set())

/**
 *
 * 	Creates a Map store at ref/nSpace
 *
 *	* Map, ready to be garbage collected
 *	* cheap *iterability* instead of WeaksMap
 *
 * 	@param {Object|Symbol} ref - Reference, must be an instance or a Symbol
 * 	@param {Object|Symbol|string} nSpace - Namespace, must be any non-falsy value
 * 	@returns {object} - The new Map store
 *
 */
export const wMap = (ref, nSpace) => wit(ref, nSpace, new Map())
