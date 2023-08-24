import { weakenIt } from '..'

const COUNT = Symbol()

/**
 *  Sets up a counter
 *
 *  * namespace can be anything
 *  * wildcard returns dictionary of all counts
 *  * windcard with quantity null resets everything
 */
export function weakCount(namespace = '*', qty) {
	let counts = weakenIt(COUNT, '*', new Map()),
		current = counts.get(namespace) ?? 0

	if (namespace === '*') {
		if (qty === null)
			// should reset
			counts = weakenIt(COUNT, '*', new Map())

		// all counts
		return Object.fromEntries(counts)
	}

	if (arguments.length === 2) {
		// coerce update if valid number
		current += !isNaN((qty -= 0)) ? qty : 1
		// only set if qty is received
		counts.set(namespace, (qty += current))
	}

	return current
}
