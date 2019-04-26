import { validPalindrome } from './valid-palindrome'

describe('125. Valid Palindrome', () => {
  test.each<[string, boolean]>([
    ['A man, a plan, a canal: Panama', true],
    ['race a car', false]
  ])('validPalindrome(%o) is %o', (value, expected) => {
    expect(validPalindrome(value)).toBe(expected)
  })
})
