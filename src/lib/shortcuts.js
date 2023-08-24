import { weakenIt } from '.'

/**
 *  Dirt-cheap weak Array
 */
export const weakArr = (ref, namespace) => weakenIt(ref, namespace, []),
	/**
	 *  Dirt-cheap weak Object
	 */
	weakObj = (ref, namespace) => weakenIt(ref, namespace, {}),
	/**
	 *  Dirt-cheap *"iterable"* WeakSet
	 */
	weakenedSet = (ref, namespace) => weakenIt(ref, namespace, new Set()),
	/**
	 *  Dirt-cheap *"iterable"* WeakMap
	 */
	weakenedMap = (ref, namespace) => weakenIt(ref, namespace, new Map())
