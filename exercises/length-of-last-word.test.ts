import { lengthOfLastWord } from './length-of-last-word'

describe('58. Length of Last Word', () => {
  test('should return length of last word', () => {
    expect(lengthOfLastWord(' ')).toBe(0)
    expect(lengthOfLastWord('hello world')).toBe(5)
    expect(lengthOfLastWord('length of last word')).toBe(4)
  })
})
