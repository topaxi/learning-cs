import { expect } from 'chai'
import { reverseArrayInPlace } from './reverse-array-in-place'

describe('reverseArrayInPlace', () => {
  it('should reverse array in place', () => {
    let array = [1, 2, 3, 4, 5]
    let reversed = reverseArrayInPlace(array)

    expect(reversed).to.deep.equal([5, 4, 3, 2, 1])
    expect(reversed).to.equal(array)

    expect(reverseArrayInPlace([1, 2, 3, 4])).to.deep.equal([4, 3, 2, 1])
  })
})
