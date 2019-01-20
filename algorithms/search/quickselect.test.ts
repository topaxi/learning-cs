import { expect } from 'chai'
import { quickselect } from './quickselect'

describe('quickselect', () => {
  it('should return kth smallest element', () => {
    expect(quickselect([0, 4, 2, 9, 5, 3], 3)).to.equal(4)
  })
})
