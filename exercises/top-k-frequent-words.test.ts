import { topKFrequentWords } from './top-k-frequent-words'

describe('topKFrequentWords()', () => {
  test('should return top k frequent words', () => {
    let words = [
      'the',
      'day',
      'is',
      'sunny',
      'the',
      'the',
      'the',
      'sunny',
      'is',
      'is'
    ]

    expect(topKFrequentWords(words, 1)).toEqual(['the'])
    expect(topKFrequentWords(words, 2)).toEqual(['the', 'is'])
    expect(topKFrequentWords(words, 3)).toEqual(['the', 'is', 'sunny'])
  })

  test('should sort words with same frequency by locale', () => {
    let words = [
      'the',
      'day',
      'it',
      'it',
      'it',
      'is',
      'sunny',
      'the',
      'the',
      'the',
      'sunny',
      'is',
      'is'
    ]

    expect(topKFrequentWords(words, 1)).toEqual(['the'])
    expect(topKFrequentWords(words, 2)).toEqual(['the', 'is'])
    expect(topKFrequentWords(words, 3)).toEqual(['the', 'is', 'it'])
  })
})
