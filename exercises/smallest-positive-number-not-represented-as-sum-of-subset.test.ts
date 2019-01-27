import { expect } from 'chai'
import { smallest } from './smallest-positive-number-not-represented-as-sum-of-subset'

describe('smallest positive number not represented as sum of subset', () => {
  it('should return smallest positive number', () => {
    expect(smallest([1, 3, 6, 10, 11, 15])).to.equal(2)
    expect(smallest([1, 1, 1, 1])).to.equal(5)
    expect(smallest([1, 1, 3, 4])).to.equal(10)
    expect(smallest([1, 2, 5, 10, 20, 40])).to.equal(4)
    expect(smallest([1, 2, 3, 4, 5, 6])).to.equal(22)
  })
})
