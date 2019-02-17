import { expect } from 'chai'
import { pow } from './pow'

describe('pow()', () => {
  it('should calculate the power of x to n', () => {
    expect(pow(2, 4)).to.equal(Math.pow(2, 4))
    expect(pow(2, 3)).to.equal(Math.pow(2, 3))
    expect(pow(2, 1)).to.equal(Math.pow(2, 1))
    expect(pow(2, 0)).to.equal(Math.pow(2, 0))
    expect(pow(2, -1)).to.equal(Math.pow(2, -1))
  })
})
