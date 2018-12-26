import { expect } from 'chai'
import { msort } from './msort'
import { shuffle } from 'lodash'

function expectSorted<T>(array: T[], cmp?: (a: T, b: T) => number) {
  expect(msort(shuffle(array), cmp)).to.deep.equal(array)
  expect(msort(shuffle(array), cmp)).to.deep.equal(array)
  expect(msort(shuffle(array), cmp)).to.deep.equal(array)
}

describe('msort', function() {
  it('returns empty array for empty array', function() {
    expect(msort([])).to.deep.equal([])
  })

  it('returns the same array for one element', function() {
    expect(msort([1])).to.deep.equal([1])
  })

  it('sorts with two elements', function() {
    expectSorted([1, 2])
    expectSorted([2, 3])
  })

  it('sorts with three elements', function() {
    expectSorted([0, 1, 2])
    expectSorted([2, 3, 4])
  })

  it('sorts', function() {
    expectSorted([-Infinity, -5, -2, -1, 0, 1, 2, 3, Math.PI, 4, 5, 16, 100])
  })

  describe('callback', function() {
    it('accepts a sort callback', function() {
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
