import { isAnagram } from './anagram'

describe('isAnagram', () => {
  test('should return true if strings are anagrams', () => {
    expect(isAnagram('', '')).toBe(true)
    expect(isAnagram('ab', 'ba')).toBe(true)
    expect(isAnagram('aa', 'aa')).toBe(true)
    expect(isAnagram('aab', 'aab')).toBe(true)
  })

  test('should return false if strings are not anagrams', () => {
    expect(isAnagram('aa', 'a')).toBe(false)
    expect(isAnagram('ab', 'ba')).toBe(true)
  })
})
