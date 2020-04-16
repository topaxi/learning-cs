import { lis } from './lis'

describe('lis', () => {
  test('should return longest increasing subsequence', () => {
    expect(lis([5, 6, 3, 4, 5, 6, 1, 2, 3, 8, 9, 5])).toEqual([
      3,
      4,
      5,
      6,
      8,
      9,
    ])
  })
})
