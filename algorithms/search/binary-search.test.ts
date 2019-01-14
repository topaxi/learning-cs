import { expect } from 'chai'
import { binarySearch } from './binary-search'

describe('binarySearch', () => {
  it('should return index of element', () => {
    expect(binarySearch([1], 1)).to.equal(0)
    expect(binarySearch([1, 2], 2)).to.equal(1)
    expect(binarySearch([1, 5, 10], 5)).to.equal(1)
    expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12], 5)).to.equal(4)
  })

  it('should return -1 on missing value', () => {
    expect(binarySearch([], 1)).to.equal(-1)
    expect(binarySearch([0, 2, 3], 1)).to.equal(-1)
  })
})
