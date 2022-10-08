import { longestCommonPrefix } from './longest-common-prefix'

describe('14. Longest Common Prefix', () => {
  test.each([
    { strings: [], prefix: '' },
    { strings: ['flower'], prefix: 'flower' },
    { strings: ['flower', 'flow', 'flight'], prefix: 'fl' },
    { strings: ['dog', 'racecar', 'car'], prefix: '' },
    { strings: ['flower', 'flower', 'flower'], prefix: 'flower' },
  ])(
    '$strings have $prefix as the longest common prefix',
    ({ strings, prefix }) => {
      expect(longestCommonPrefix(strings)).toBe(prefix)
    }
  )
})
