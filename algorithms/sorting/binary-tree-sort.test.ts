import { binaryTreeSort } from './binary-tree-sort'
import { shuffle } from '../../utils'

function expectSorted<T>(array: T[], cmp?: (a: T, b: T) => number) {
  expect(binaryTreeSort(shuffle(array), cmp)).toEqual(array)
  expect(binaryTreeSort(shuffle(array), cmp)).toEqual(array)
  expect(binaryTreeSort(shuffle(array), cmp)).toEqual(array)
}

describe('binaryTreeSort', () => {
  test('returns empty array for empty array', () => {
    expect(binaryTreeSort([])).toEqual([])
  })

  test('returns the same array for one element', () => {
    expect(binaryTreeSort([1])).toEqual([1])
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
