import { expect } from 'chai'
import { maximumSubarraySum } from './maximum-subarray-sum'

describe('maximumSubarraySum', () => {
  it('should return maximum subarray sum', () => {
    expect(maximumSubarraySum([2, 3])).to.equal(5)
    expect(maximumSubarraySum([-1, -2])).to.equal(-1)
    expect(maximumSubarraySum([-1, 2, -1, 3])).to.equal(4)
    expect(maximumSubarraySum([-1, 2, -1, 3, 4])).to.equal(8)
  })
})
