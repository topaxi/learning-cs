import { findMinValueInRotatedArray } from './find-min-value-in-rotated-array'

describe('findMinValueInRotatedArray', () => {
  test('should find smallest value', () => {
    expect(findMinValueInRotatedArray([3, 4, 5, 6, 1, 2])).toBe(1)
    expect(findMinValueInRotatedArray([3, 4, 5, 6, 7, 2])).toBe(2)
    expect(findMinValueInRotatedArray([3, 4, 5, 6, 2])).toBe(2)
    expect(findMinValueInRotatedArray([4, 5, 6, 2, 3])).toBe(2)
    expect(findMinValueInRotatedArray([3, 4, 5, 6])).toBe(3)
    expect(findMinValueInRotatedArray([7, 8, 3, 4, 5, 6])).toBe(3)
    expect(findMinValueInRotatedArray([7, 3, 4, 5])).toBe(3)
    expect(findMinValueInRotatedArray([7, 3, 4, 5, 6])).toBe(3)
    expect(findMinValueInRotatedArray([1, 2, 3, 4, 5, 6])).toBe(1)
  })
})
