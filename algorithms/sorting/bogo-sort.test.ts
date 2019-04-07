import { bogosort } from './bogo-sort'
import { shuffle } from '../../utils'

function expectSorted<T>(array: T[], cmp?: (a: T, b: T) => number) {
  expect(bogosort(shuffle(array), cmp)).toEqual(array)
  expect(bogosort(shuffle(array), cmp)).toEqual(array)
  expect(bogosort(shuffle(array), cmp)).toEqual(array)
}

describe('bogosort', () => {
  test('returns empty array for empty array', () => {
    expect(bogosort([])).toEqual([])
  })

  test('returns the same array for one element', () => {
    expect(bogosort([1])).toEqual([1])
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
    expectSorted([-Infinity, -5, -1, 0, 1, Math.PI, 4])
  })

  describe('callback', () => {
    test('accepts a sort callback', () => {
      expectSorted([6, 5, 4, 3, 2, 1], (a, b) => b - a)
      expectSorted(['a', 'ä', 'b', 'c'], (a, b) => a.localeCompare(b))
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
        (a, b) => a.id - b.id
      )
    })
  })
})
