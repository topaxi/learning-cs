import { Trie } from './trie'

describe('Trie', () => {
  test('should store words', () => {
    let trie = new Trie()

    trie.addWord('blah')
    trie.addWord('bla')
    trie.addWord('test')

    expect(trie.getWords()).toEqual(['bla', 'blah', 'test'])
  })

  test('should suggest words', () => {
    let trie = new Trie()

    trie.addWord('blah')
    trie.addWord('bla')
    trie.addWord('test')

    expect(trie.suggestWords('bl')).toEqual(['bla', 'blah'])
    expect(trie.suggestWords('t')).toEqual(['test'])
    expect(trie.suggestWords('ha')).toEqual([])
    expect(trie.suggestWords('')).toEqual([])
  })
})
