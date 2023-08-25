import { weakenIt, wStore } from '..'

/**
 *  Set up a counter
 *
 *  * namespace can be any string
 *  * '*' namespace casts dictionary of all counts
 *  * full reset via wStore.delete(wCount)
 * 	* updates only if qty is an integer
 * 	* null qty resets single namespace
 */
export function wCount(nSpace = '*', qty) {
	if (nSpace === '*')
		// wildcard, cast dictionary
		return Object.fromEntries(wStore.get(wCount) ?? [])

	let count = weakenIt(wCount, nSpace)

	if (!Number.isInteger(count) || qty === null)
		// reset or tampered
		count = 0

	if (Number.isInteger(qty))
		// should update
		count += qty

	// upsert
	return weakenIt(wCount, nSpace, count)
}
