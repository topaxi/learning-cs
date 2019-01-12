import { expect } from 'chai'
import { lis } from './lis'
import { LinkedList } from '../../data-structures/list/linked-list'

describe('lis', () => {
  it('should return longest increasing subsequence', () => {
    expect(lis([5, 6, 3, 4, 5, 6, 1, 2, 3, 8, 9, 5])).to.deep.equal([
      3,
      4,
      5,
      6,
      8,
      9
    ])
  })
})
