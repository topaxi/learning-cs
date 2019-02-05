import { expect } from 'chai'
import { quickselect } from './quickselect'

describe('quickselect', () => {
  it('should return kth smallest element', () => {
    expect(quickselect([3, 2, 3, 1, 2, 4, 5, 5, 6], 3)).to.equal(2)
    expect(quickselect([0, 4, 2, 9, 5, 3], 3)).to.equal(3)
  })

  it('should return kth largest element', () => {
    expect(quickselect([3, 2, 1, 5, 6, 4], 2, (a, b) => a > b)).to.equal(5)

    expect(
      quickselect([3, 2, 3, 1, 2, 4, 5, 5, 6], 3, (a, b) => a > b)
    ).to.equal(5)

    expect(quickselect([0, 4, 2, 9, 5, 3], 3, (a, b) => a > b)).to.equal(4)
  })
})
