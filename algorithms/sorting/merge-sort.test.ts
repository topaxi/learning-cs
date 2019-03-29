import { msort } from './merge-sort'
import { shuffle } from '../../utils'

function expectSorted<T>(array: T[], cmp?: (a: T, b: T) => number) {
  expect(msort(shuffle(array), cmp)).toEqual(array)
  expect(msort(shuffle(array), cmp)).toEqual(array)
  expect(msort(shuffle(array), cmp)).toEqual(array)
}

describe('msort', () => {
  test('returns empty array for empty array', () => {
    expect(msort([])).toEqual([])
  })

  test('returns the same array for one element', () => {
    expect(msort([1])).toEqual([1])
  })

  test('sorts with two elements', () => {
    expectSorted([1, 2])
    expectSorted([2, 3])
  })

  test('sorts with three elements', () => {
    expectSorted([0, 1, 2])
    expectSorted([2, 3, 4])
  })

  test('sorts', () => {
    expectSorted([-Infinity, -5, -2, -1, 0, 1, 2, 3, Math.PI, 4, 5, 16, 100])
  })

  describe('callback', () => {
    test('accepts a sort callback', () => {
      expectSorted([6, 5, 4, 3, 2, 1], (a, b) => a - b)
      expectSorted(['a', 'ä', 'b', 'c'], (a, b) => b.localeCompare(a))
      expectSorted(
        [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 }
        ],
        (a, b) => b.id - a.id
      )
    })
  })
})
