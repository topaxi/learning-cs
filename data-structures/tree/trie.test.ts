import { expect } from 'chai'
import { Trie } from './trie'

describe.only('Trie', () => {
  it('should store words', () => {
    let trie = new Trie()

    trie.addWord('bla')
    trie.addWord('blah')
    trie.addWord('test')

    expect(trie.getWords()).to.deep.equal(['bla', 'blah', 'test'])
  })
})
