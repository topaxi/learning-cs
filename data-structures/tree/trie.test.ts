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
})
