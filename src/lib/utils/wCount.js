import { wCast, wit } from '..'

/**
 *  Set up a counter
 *
 *  * namespace can be any string
 *  * * namespace casts dictionary of counts
 *  * hard reset: wStore.delete(wCount) or wDel(wCount)
 * 	* updates only if qty is an integer
 * 	* null qty resets single namespace
 */
export function wCount(nSpace = '*', qty) {
	if (nSpace === '*')
		// wildcard, cast context
		return wCast(wCount)

	let count = wit(wCount, nSpace)

	if (!Number.isInteger(count) || qty === null)
		// init or reset
		count = 0

	if (Number.isInteger(qty))
		// update count
		count += qty

	// upsert
	return wit(wCount, nSpace, count)
}
