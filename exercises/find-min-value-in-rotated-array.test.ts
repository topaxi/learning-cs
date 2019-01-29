import { expect } from 'chai'
import { findMinValueInRotatedArray } from './find-min-value-in-rotated-array'

describe('findMinValueInRotatedArray', () => {
  it('should find smallest value', () => {
    expect(findMinValueInRotatedArray([3, 4, 5, 6, 1, 2])).to.equal(1)
    expect(findMinValueInRotatedArray([3, 4, 5, 6, 7, 2])).to.equal(2)
    expect(findMinValueInRotatedArray([3, 4, 5, 6, 2])).to.equal(2)
    expect(findMinValueInRotatedArray([4, 5, 6, 2, 3])).to.equal(2)
    expect(findMinValueInRotatedArray([3, 4, 5, 6])).to.equal(3)
    expect(findMinValueInRotatedArray([7, 8, 3, 4, 5, 6])).to.equal(3)
    expect(findMinValueInRotatedArray([7, 3, 4, 5])).to.equal(3)
  })

  it.skip('should pass', () => {
    expect(findMinValueInRotatedArray([7, 3, 4, 5, 6])).to.equal(3)
  })
})
