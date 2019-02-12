import { expect } from 'chai'
import { sumWithoutPlus } from './sum-without-plus'

describe('sumWithoutPlus', () => {
  it('should sum two numbers', () => {
    expect(sumWithoutPlus(5, 7)).to.equal(12)
    expect(sumWithoutPlus(-2, 2)).to.equal(0)
    expect(sumWithoutPlus(0, 2)).to.equal(2)
    expect(sumWithoutPlus(2, 0)).to.equal(2)
    expect(sumWithoutPlus(0, -2)).to.equal(-2)
  })
})
