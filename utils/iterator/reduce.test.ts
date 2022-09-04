import { reduce } from './reduce'

describe('utils/iterator/reduce', () => {
  test('applies the reduce function to each value', () => {
    expect(reduce([1, 2, 3], (a, b) => a + b)).toBe(6)
  })

  test('works with iterables', () => {
    function* seq(): IterableIterator<number> {
      yield 1
      yield 2
      yield 3
    }

    expect(reduce(seq(), (a, b) => a + b)).toBe(6)
  })

  test('takes the initial value as the first accumulator value', () => {
    expect(reduce([1, 2, 3], (a, b) => a + b, 10)).toBe(16)
  })

  test('throws an error on an empty iterable without default value', () => {
    expect(reduce([], (a, b) => a + b, 0)).toBe(0)
    expect(() => reduce<number>([], (a, b) => a + b)).toThrow(
      /Reduce of empty iterable without initial value/
    )
  })
})
