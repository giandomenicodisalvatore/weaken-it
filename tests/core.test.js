import { wStore, weakenIt } from '../src/lib'
import { rand } from '@ngneat/falso'

const GoodRefs = [
		// any instance or symbol
		new Promise(res => res('promised')),
		new URL('any://url'),
		new FormData(),
		new (class {})(),
		() => {},
		Symbol(),
		{},
		[],
	],
	BadRefs = [
		// primitive values
		'string',
		123456,
		undefined,
		null,
		NaN,
	],
	// falsy
	BadNSpaces = BadRefs.slice(2),
	GoodNSpaces = [
		// truthy
		...BadRefs.slice(0, 2),
		...GoodRefs,
	]

describe('core functionality', () => {
	describe('wStore', () => {
		let ref = rand(GoodRefs)

		it('a plain WeakMap', () => {
			// plain js WeakMap instance
			expect(wStore).toBeInstanceOf(WeakMap)
			expect(wStore.has(ref)).toBe(false)
		})

		it('used by weakenIt', () => {
			// let's create a context
			weakenIt(ref, 'it', 'works')
			expect(wStore.has(ref)).toBe(true)
		})

		it('to store Map contexts', () => {
			// contexts are Map instances
			expect(wStore.get(ref)).toBeInstanceOf(Map)
		})

		it('exposed to the user', () => {
			// direct access
			expect(wStore.get(ref).get('it')).toBe('works')

			// direct update
			wStore.get(ref).set('it', 'changed')
			expect(wStore.get(ref).get('it')).toBe('changed')

			// hard reset
			wStore.delete(ref)
			expect(wStore.has(ref)).toBe(false)
			expect(wStore.get(ref)).toBeUndefined()
		})

		it('stored data expires after refs', () => {
			// upsert
			weakenIt(ref, 'expires', 'with ref')
			expect(wStore.has(ref)).toBe(true)
			expect(wStore.get(ref)).toBeInstanceOf(Map)
			expect(weakenIt(ref, 'expires')).toBe('with ref')

			ref = null // unreachable
			expect(wStore.get(ref)).toBeUndefined()
		})
	})

	describe('weakenIt', () => {
		let goodRef = rand(GoodRefs),
			badRef = rand(BadRefs),
			goodNS = rand(GoodNSpaces),
			badNS = rand(BadNSpaces)

		it('param ref must be instance or symbol', () => {
			expect(() => weakenIt(goodRef, GoodNSpaces)).not.toThrowError()
			expect(() => weakenIt(badRef, goodNS)).toThrowError()
			expect(() => weakenIt()).toThrowError()
		})

		it('creates a context for valid refs', () => {
			let temp = Symbol()

			expect(weakenIt(temp)).toBeUndefined()
			expect(wStore.has(temp)).toBe(true)
			expect(wStore.get(temp)).toBeInstanceOf(Map)
			expect(wStore.has(goodRef)).toBe(true)
			expect(wStore.get(goodRef)).toBeInstanceOf(Map)
		})

		it('param nSpace must be truthy', () => {
			expect(() => weakenIt(goodRef, goodNS)).not.toThrowError()
			expect(() => weakenIt(badRef, badNS)).toThrowError()
			expect(weakenIt(goodRef)).toBeUndefined()
		})

		it('reads values from wStore', () => {
			// set directly
			wStore.set(goodRef, new Map().set(goodNS, 'it works'))
			expect(weakenIt(goodRef, goodNS)).toBe('it works')
			expect(weakenIt(goodRef, 'not set')).toBeUndefined()

			// set directly
			wStore.set(goodRef, new Map().set('new ctx', 'cleared'))
			expect(weakenIt(goodRef, 'not set')).toBeUndefined()
			expect(weakenIt(goodRef, 'new ctx')).toBe('cleared')
		})

		it('upserts values at namespace', () => {
			expect(weakenIt(goodRef, 'value', true)).toBe(true)
			expect(weakenIt(goodRef, 'value', null)).toBe(null)
			expect(weakenIt(goodRef, 'value', 12345)).toBe(12345)
			expect(weakenIt(goodRef, 'value', 'str')).toBe('str')
		})
	})
})
