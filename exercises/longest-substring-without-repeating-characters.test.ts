import { lengthOfLongestSubstring } from './longest-substring-without-repeating-characters'

describe('3. Longest Substring Without Repeating Characters', () => {
  test.each<[string, number]>([
    ['', 0],
    ['a', 1],
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3]
  ])('lengthOfLongestSubstring(%o) is %o', (str, length) => {
    expect(lengthOfLongestSubstring(str)).toBe(length)
  })
})
