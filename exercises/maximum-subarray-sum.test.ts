import { maximumSubarraySum } from './maximum-subarray-sum'

describe('maximumSubarraySum', () => {
  test('should return maximum subarray sum', () => {
    expect(maximumSubarraySum([2, 3])).toBe(5)
    expect(maximumSubarraySum([-1, -2])).toBe(-1)
    expect(maximumSubarraySum([-1, 2, -1, 3])).toBe(4)
    expect(maximumSubarraySum([-1, 2, -1, 3, 4])).toBe(8)
  })
})
