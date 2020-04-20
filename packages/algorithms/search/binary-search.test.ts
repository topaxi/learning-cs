import { binarySearch } from './binary-search'

describe('binarySearch', () => {
  test('should return index of element', () => {
    expect(binarySearch([1], 1)).toBe(0)
    expect(binarySearch([1, 2], 2)).toBe(1)
    expect(binarySearch([1, 5, 10], 5)).toBe(1)
    expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12], 5)).toBe(4)
  })

  test('should return -1 on missing value', () => {
    expect(binarySearch([], 1)).toBe(-1)
    expect(binarySearch([0, 2, 3], 1)).toBe(-1)
  })
})
