import { skip } from './skip'

describe('utils/iterator/skip', () => {
  test('should skip values', () => {
    expect(Array.from(skip([1, 2, 3, 4, 5], 0))).toEqual([1, 2, 3, 4, 5])
    expect(Array.from(skip([1, 2, 3, 4, 5], 1))).toEqual([2, 3, 4, 5])
    expect(Array.from(skip([1, 2, 3, 4, 5], 2))).toEqual([3, 4, 5])
    expect(Array.from(skip([1, 2, 3, 4, 5], 5))).toEqual([])
  })
})
