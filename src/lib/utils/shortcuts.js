import { weakenIt } from '..'

/**
 *  Dirt-cheap weak Array
 */
export const wArr = (ref, nSpace) => weakenIt(ref, nSpace, []),
	/**
	 *  Dirt-cheap weak Object
	 */
	wObj = (ref, nSpace) => weakenIt(ref, nSpace, {}),
	/**
	 *  Dirt-cheap weak Key-value store
	 */
	wKV = (ref, nSpace) => weakenIt(ref, nSpace, Object.create(null)),
	/**
	 *  Dirt-cheap *iterable* WeakSet
	 */
	wSet = (ref, nSpace) => weakenIt(ref, nSpace, new Set()),
	/**
	 *  Dirt-cheap *iterable* WeakMap
	 */
	wMap = (ref, nSpace) => weakenIt(ref, nSpace, new Map())
