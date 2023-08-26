import { wStore, wit } from '..'

/**
 * 	Hard reset context
 */
export const wDel = ref => wStore.set(ref, new Map()),
	/**
	 *  Retrieve full context
	 */
	wCtx = ref => wStore.get(ref),
	/**
	 *  Cast full context as object
	 */
	wCast = ref => Object.fromEntries(wStore.get(ref) ?? []),
	/**
	 *  Upsert only if nullish
	 */
	wSure = (ref, nSpace, val) => wit(ref, nSpace) ?? wit(ref, nSpace, val),
	/**
	 *  Dirt-cheap weak Array
	 */
	wArr = (ref, nSpace) => wit(ref, nSpace, []),
	/**
	 *  Dirt-cheap weak Object
	 */
	wObj = (ref, nSpace) => wit(ref, nSpace, {}),
	/**
	 *  Dirt-cheap weak Key-value store
	 */
	wKV = (ref, nSpace) => wit(ref, nSpace, Object.create(null)),
	/**
	 *  Dirt-cheap *iterable* WeakSet
	 */
	wSet = (ref, nSpace) => wit(ref, nSpace, new Set()),
	/**
	 *  Dirt-cheap *iterable* WeakMap
	 */
	wMap = (ref, nSpace) => wit(ref, nSpace, new Map())
