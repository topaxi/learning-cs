import { expect } from 'chai'
import { topKFrequentWords } from './top-k-frequent-words'

describe('topKFrequentWords()', () => {
  it('should return top k frequent words', () => {
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

    expect(topKFrequentWords(words, 1)).to.deep.equal(['the'])
    expect(topKFrequentWords(words, 2)).to.deep.equal(['the', 'is'])
    expect(topKFrequentWords(words, 3)).to.deep.equal(['the', 'is', 'sunny'])
  })

  it('should sort words with same frequency by locale', () => {
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

    expect(topKFrequentWords(words, 1)).to.deep.equal(['the'])
    expect(topKFrequentWords(words, 2)).to.deep.equal(['the', 'is'])
    expect(topKFrequentWords(words, 3)).to.deep.equal(['the', 'is', 'it'])
  })
})
