import { reverseWords } from './reverse-words'

describe('557. Reverse Words in a String III', () => {
  test('should reverse words', () => {
    expect(reverseWords('reverse the given words in this string')).toEqual(
      'esrever eht nevig sdrow ni siht gnirts'
    )
  })
})
