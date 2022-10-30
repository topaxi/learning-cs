import { wordPattern } from './word-pattern'

describe('290. Word Pattern', () => {
  it.each`
    pattern   | words
    ${'aaaa'} | ${'dog dog dog dog'}
    ${'abba'} | ${'dog cat cat dog'}
  `('should match pattern with words', ({ pattern, words }) => {
    expect(wordPattern(pattern, words)).toBe(true)
  })

  it.each`
    pattern    | words
    ${'aaaa'}  | ${'dog cat cat dog'}
    ${'abba'}  | ${'dog cat cat fish'}
    ${'abba'}  | ${'dog dog dog dog'}
    ${'hello'} | ${'hello'}
  `('should not match pattern with words', ({ pattern, words }) => {
    expect(wordPattern(pattern, words)).toBe(false)
  })
})
