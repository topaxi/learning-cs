import { expect } from 'chai'
import { MemoTrie } from './memo-trie'

describe('MemoTrie', () => {
  it('should map array of objects to a value', () => {
    let memo = new MemoTrie()

    memo.set([1, 2, 3], 'test')
    expect(memo.get([1, 2, 3] as any)).to.equal('test')

    let obj = {}
    memo.set([obj, 2, obj], 'foobar')
    expect(memo.get([obj, 2, obj] as any)).to.equal('foobar')
  })
})
