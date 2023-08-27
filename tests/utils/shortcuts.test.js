import {
	wStore,
	weakenIt,
	wit,
	wDel,
	wCtx,
	wCast,
	wSure,
	wArr,
	wObj,
	wKV,
	wMap,
	wSet,
} from '../../src/lib'

const mockLib = await import('../../src/lib'),
	witSpy = vi.spyOn(mockLib, 'wit'),
	examined = Symbol(),
	ignored = Symbol()

describe('shortcuts', () => {
	beforeEach(() => {
		wit(examined, 'examined', 'stored')
		wit(ignored, 'ignored', 'stored')
		vi.clearAllMocks()
	})

	describe('wDel', () => {
		it('deletes context directly on wStore', () => {
			const spy = vi.spyOn(wStore, 'delete')
			wDel(examined)
			expect(spy).toHaveBeenCalledOnce()
			expect(wStore.get(examined)).toBe(undefined)
		})

		it('deletes context just for ref', () => {
			expect(wit(ignored, 'ignored')).toBe('stored')
		})

		it('forces weakenIt to create a new ctx', () => {
			wit(examined, 'examined', 'new ctx created')
			const oldCtx = wStore.get(examined)

			wDel(examined)
			expect(wStore.get(examined)).not.toBe(oldCtx)
		})

		it('should return void', () => {
			expect(wDel(examined)).toBe(undefined)
		})
	})

	describe('wCtx', () => {
		it('gets ctx directly from wStore', () => {
			const spy = vi.spyOn(wStore, 'get')
			expect(wCtx(examined)).toBe(wStore.get(examined))
			expect(spy).toHaveBeenCalled(2)
		})

		it('gets the ctx associated to ref', () => {
			expect(wCtx(examined)).not.toBe(wStore.get(ignored))
		})

		describe('returned context', () => {
			it("if exists it's a Map", () => {
				expect(wCtx(examined)).toBeInstanceOf(Map)
			})

			it('else void', () => {
				const nonExistent = Symbol()
				expect(wCtx(nonExistent)).toBe(undefined)
			})
		})
	})

	describe('wCast', () => {
		const spy = vi.spyOn(wStore, 'get')

		it('gets ctx directly from wStore', () => {
			wCast(examined)
			expect(spy).toHaveBeenCalledOnce()
		})

		it('gets the ctx associated to ref', () => {
			expect(wCast(examined)).not.toEqual(wCast(ignored))
		})

		describe('returned context', () => {
			it("if exists it's cast to Object", () => {
				expect(wCast(examined)).toEqual({ examined: 'stored' })
			})

			it('else empty Object', () => {
				const nonExistent = Symbol()
				expect(wCast(nonExistent)).toEqual({})
			})
		})
	})

	describe('wSure', () => {
		const oneOffArgs = [Symbol(), 'calls', 2]

		it('reuses weakenIt under the hood', async () => {
			expect(wStore.get(oneOffArgs.at(0))).toBe(undefined)
			expect(wSure(...oneOffArgs)).toBe(oneOffArgs.at(-1))

			expect(witSpy).toHaveBeenCalledTimes(2)
			expect(witSpy).nthReturnedWith(1, undefined)
			expect(witSpy).lastCalledWith(...oneOffArgs)
			expect(witSpy).lastReturnedWith(oneOffArgs.at(-1))
		})

		it('preserves non-nullish values', () => {
			// not nullish anymore
			expect(wSure(...oneOffArgs.toSpliced(-1, 1, 'changed')))
				.itself.toBe(oneOffArgs.at(-1))
				.and.not.toBe('changed')

			expect(witSpy).toHaveBeenCalledWith(...oneOffArgs.slice(0, -1))
			expect(witSpy).toHaveReturnedWith(oneOffArgs.at(-1))
		})

		it('only upserts on nullish values', () => {
			const shouldUpsert = wSure(oneOffArgs.at(0), 'non-existent', 'upserted')
			expect(shouldUpsert).toBe('upserted')

			expect(witSpy).toHaveBeenCalledTimes(2)
			expect(witSpy).toHaveNthReturnedWith(1, undefined)
			expect(witSpy).toHaveLastReturnedWith('upserted')
		})
	})

	describe('wArr', () => {
		it('stores a new array at ref/nSpace', () => {
			const examinedArr = wArr(examined, 'array'),
				storedArr = wStore.get(examined).get('array'),
				weakenArr = weakenIt(examined, 'array')

			expect(examinedArr).to.be.instanceOf(Array).and.to.be.empty
			expect(examinedArr).toBe(storedArr)
			expect(examinedArr).toBe(weakenArr)
		})
	})

	describe('wObj', () => {
		it('stores a new object at ref/nSpace', () => {
			const examinedObj = wObj(examined, 'object'),
				storedObj = wStore.get(examined).get('object'),
				weakenObj = weakenIt(examined, 'object')

			expect(examinedObj).to.be.empty.and.to.be.instanceOf(Object)
			expect(examinedObj).toBe(storedObj)
			expect(examinedObj).toBe(weakenObj)
		})
	})

	describe('wKV', () => {
		it('stores a new key-value store at ref/nSpace', () => {
			const examinedKV = wKV(examined, 'kv'),
				storedKV = wStore.get(examined).get('kv'),
				weakenKV = weakenIt(examined, 'kv')

			expect(examinedKV) // Object.create(null)
				.to.be.empty.and.not.to.be.instanceOf(Object)
			expect(examinedKV).toBe(storedKV)
			expect(examinedKV).toBe(weakenKV)
		})
	})

	describe('wMap', () => {
		it('stores a new Map at ref/nSpace', () => {
			const examinedMap = wMap(examined, 'map'),
				storedMap = wStore.get(examined).get('map'),
				weakenMap = weakenIt(examined, 'map')

			expect(examinedMap).to.be.empty.and.to.be.instanceOf(Map)
			expect(examinedMap).toBe(storedMap)
			expect(examinedMap).toBe(weakenMap)
		})
	})

	describe('wSet', () => {
		it('stores a new Set at ref/nSpace', () => {
			const examinedSet = wSet(examined, 'set'),
				storedSet = wStore.get(examined).get('set'),
				weakenSet = weakenIt(examined, 'set')

			expect(examinedSet).to.be.empty.and.to.be.instanceOf(Set)
			expect(examinedSet).toBe(storedSet)
			expect(examinedSet).toBe(weakenSet)
		})
	})
})
