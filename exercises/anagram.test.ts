import { expect } from 'chai'
import { isAnagram } from './anagram'

describe.only('isAnagram', () => {
  it('should return true if strings are anagrams', () => {
    expect(isAnagram('', '')).to.be.true
    expect(isAnagram('ab', 'ba')).to.be.true
    expect(isAnagram('aa', 'aa')).to.be.true
    expect(isAnagram('aab', 'aab')).to.be.true
  })

  it('should return false if strings are not anagrams', () => {
    expect(isAnagram('aa', 'a')).to.be.false
    expect(isAnagram('ab', 'ba')).to.be.true
  })
})
