import type { NSpaceType, RefType } from '@lib'
import { wCast, wit } from '@lib'

/**
 *
 * 	Set up a counter for multiple namespaces
 *
 * 	wCount defines and updates counts in different namespaces
 * 	Each namespace can be identified by a unique string
 * 	Allows hard reset via: `wStore.delete(wCount)` or `wDel(wCount)`
 *
 * 	@param nSpace - The namespace for the count to update
 * 	Reserved namespace token '*' returns a dictionary of all the active counts
 *
 * 	@param qty - Optiona, the quantity to update the count by
 * 	Pass null to reset namespace count to 0
 *
 * 	@returns - The updated/read count for the specified namespace
 *
 * 	@example
 * 	// Set up counts for 'namespace1' and 'namespace2'
 * 	wCount('namespace1', 3); // returns 3
 * 	wCount('namespace2', 5); // returns 5
 *
 * 	// Update the count for 'namespace1' by 2
 * 	wCount('namespace1', 2); // returns 5
 *
 * 	// Reset the count for 'namespace2'
 * 	wCount('namespace2', null); // returns 0
 *
 * 	// Hard reset all counts
 *	wStore.delete(wCount)
 *	wDel(wCount)
 *
 */
export function wCount(nSpace: NSpaceType, qty: number | null): number

export function wCount(nSpace: '*'): { [k: string | symbol]: any }

export function wCount(nSpace: any = '*', qty?: any) {
	if (nSpace === '*')
		// wildcard, cast context
		return wCast(wCount)

	let count = wit(wCount, nSpace) - 0

	// init or reset
	if (!Number.isInteger(count) || qty === null) count = 0

	// update
	if (Number.isInteger(qty - 0)) count += qty

	// upsert
	return wit(wCount, nSpace, count)
}
