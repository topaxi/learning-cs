import { differenceOfSum } from './diff-between-element-sum-and-digit-sum-of-array'

describe('2535. Difference Between Element Sum and Digit Sum of an Array', () => {
  it.each([
    [[1, 15, 6, 3], 9],
    [[1, 2, 3, 4], 0],
  ])(
    '%s should return the absolute difference between the element sum and digit sum of %d',
    (nums, diff) => {
      expect(differenceOfSum(nums)).toBe(diff)
    }
  )
})
