import { restoreString } from './shuffle-string'

describe('1528. Shuffle String', () => {
  it('should return the shuffled string', () => {
    expect(restoreString('codeleet', [4, 5, 6, 7, 0, 2, 1, 3])).toBe(
      'leetcode'
    )
    expect(restoreString('abc', [0, 1, 2])).toBe('abc')
  })
})
