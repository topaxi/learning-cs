import { longestIncreasingPath } from './longest-increasing-path'

describe('longestIncreasingPath', () => {
  test('should return length of longest increasing path in matrix', () => {
    let matrix = [[9, 9, 4], [6, 6, 8], [2, 1, 1]]

    expect(longestIncreasingPath(matrix)).toBe(4)

    matrix = [[3, 4, 5], [3, 2, 6], [2, 2, 1]]

    expect(longestIncreasingPath(matrix)).toBe(4)
  })
})
