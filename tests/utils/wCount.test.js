import { wStore, wCount, wDel } from '../../src/lib'
import { randNumber } from '@ngneat/falso'

describe('wCount', () => {
	afterEach(() => {
		wStore.delete(wCount) // hard reset
	})

	it('wildcard namespace casts all counts as object', () => {
		const example = randNumber({ min: 1, max: 10 })
		expect(wCount('*')).to.be.empty.and.toBeTypeOf('object')

		wCount('example', example) // update
		expect(wCount('*')).toEqual({ example })
	})

	it('defaults to wildcard behaviour', () => {
		const example = randNumber({ min: 1, max: 10 })
		wCount('example', example)
		expect(wCount()).toEqual(wCount('*'))
		expect(wCount()).toEqual({ example })
	})

	it('only works with integers', () => {
		const float = Math.random().toPrecision(3),
			example = randNumber({ min: 1, max: 10 })

		expect(wCount('float', float)).toBe(0)
		expect(wCount('float')).toBe(0)

		expect(wCount('example', example)).toBe(example)
		expect(wCount('example')).toBe(example)

		expect(wCount('*')).toEqual({ example, float: 0 })
	})

	it('negative integers decrease count', () => {
		const example = randNumber({ min: 1, max: 10 }),
			delta = randNumber({ min: 1, max: 3 })
		wCount('example', example)
		wCount('example', -delta)
		expect(wCount('*')).toEqual({ example: example - delta })
		expect(wCount('example')).toBe(example - delta)
	})

	it('pass null to reset namespace', () => {
		const example = randNumber({ min: 1, max: 10 })

		wCount('example', example)
		expect(wCount('example')).toBe(example)
		expect(wCount('*')).toEqual({ example })

		wCount('example', null)
		expect(wCount('example')).toBe(0)
		expect(wCount('*')).toEqual({ example: 0 })
	})

	describe('hard reset all counts with wDel', () => {
		const counts = ['a', 'b', 'c'].reduce((obj, prop) => {
			obj[prop] = Number(randNumber({ min: -5, max: 5 }))
			return obj
		}, {})

		it('resets to zero single namespaces', () => {
			for (const [nSPace, val] of Object.entries(counts))
				expect(wCount(nSPace, val)).toBe(val) // upsert

			wDel(wCount)

			for (const [nSPace, _] of Object.entries(counts))
				expect(wCount(nSPace)).toBe(0) // now reads zero

			expect(wCount('*')).toEqual(wCount())
			expect(wCount()).toEqual(
				Object.keys(counts).reduce((obj, key) => {
					return Object.assign(obj, { [key]: 0 }) // all zero
				}, {})
			)
		})

		it('also deletes keys', () => {
			wDel(wCount)
			expect(wCount('*')).toEqual({})
			expect(wCount()).toEqual({})
		})
	})
})
