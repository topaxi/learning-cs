import { expect } from 'chai'
import { Trie } from './trie'

describe('Trie', () => {
  it('should store words', () => {
    let trie = new Trie()

    trie.addWord('blah')
    trie.addWord('bla')
    trie.addWord('test')

    expect(trie.getWords()).to.deep.equal(['bla', 'blah', 'test'])
  })

  it('should suggest words', () => {
    let trie = new Trie()

    trie.addWord('blah')
    trie.addWord('bla')
    trie.addWord('test')

    expect(trie.suggestWords('bl')).to.deep.equal(['bla', 'blah'])
    expect(trie.suggestWords('t')).to.deep.equal(['test'])
    expect(trie.suggestWords('ha')).to.deep.equal([])
    expect(trie.suggestWords('')).to.deep.equal([])
  })
})
