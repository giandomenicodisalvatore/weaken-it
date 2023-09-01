import { wMemo, wDel } from '@lib'

let expensiveCompute = vi.fn().mockImplementation((...num: number[]) => {
		return Math.max(...num)
	}),
	joinX = vi
		.fn()
		.mockImplementation((...args: any[]) => args.concat('X').join('')),
	customSerialize = (args: any[]) => args.join('+'),
	memoA = wMemo(expensiveCompute),
	memoB = wMemo(expensiveCompute, customSerialize),
	memoX = wMemo(joinX)

describe('wMemo', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('caches previous results', () => {
		for (let t = 0; t < 3; t++) expect(memoA(1, 2, 3)).toBe(3)
		expect(expensiveCompute).toBeCalledTimes(1)
	})

	it('caches even memoized fn', () => {
		const exampleFn = () => 'example'

		for (let t = 0; t < 3; t++) {
			expect(wMemo(expensiveCompute, customSerialize)).toBe(memoB)
			expect(wMemo(exampleFn)).toBe(wMemo(exampleFn))
			expect(wMemo(expensiveCompute)).toBe(memoA)
		}
	})

	it('allows custom serialization', () => {
		for (let t = 0; t < 3; t++) expect(memoB(1, 2, 3)).toBe(3)
		expect(expensiveCompute).toBeCalledTimes(1)
	})

	it('allows clearing cache', () => {
		for (let t = 0; t < 3; t++) {
			// demonstrate normal working
			expect(memoX(1, 2, 3)).toBe('123X')
			expect(memoA(1, 2, 3)).toBe(3)
			// shared cache between instances
			expect(expensiveCompute).toBeCalledTimes(0)
			expect(joinX).toBeCalledTimes(1)
		}

		wDel(expensiveCompute)
		memoA = wMemo(expensiveCompute)
		// lose memoized fn references

		expect(memoA).toBe(wMemo(expensiveCompute))
		expect(memoX).toBe(wMemo(joinX))

		// still works
		expect(memoX(1, 2, 3)).toBe('123X') // executed
		expect(memoA(1, 2, 3)).toBe(3) // cached
		expect(expensiveCompute).toBeCalledTimes(1)
		expect(joinX).toHaveBeenCalledTimes(1)
	})
})
