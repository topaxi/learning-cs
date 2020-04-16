import { mostCommonWord } from './most-common-word'

describe('819. Most Common Word', () => {
  test.each<[string, string[], string]>([
    [
      'Bob hit a ball, the hit BALL flew far after it was hit.',
      ['hit'],
      'ball',
    ],
    ['Bob. hIt, baLl', ['bob', 'hit'], 'ball'],
  ])('mostCommonWord(%o, %o) is %o', (paragraph, banned, expected) => {
    expect(mostCommonWord(paragraph, banned)).toBe(expected)
  })
})
