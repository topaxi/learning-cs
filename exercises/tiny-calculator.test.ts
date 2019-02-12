import { expect } from 'chai'
import { tinyCalculator } from './tiny-calculator'

describe('tinyCalculator', () => {
  it('should add numbers', () => {
    expect(tinyCalculator('1 + 1')).to.equal(2)
    expect(tinyCalculator('1 + 9')).to.equal(10)
    expect(tinyCalculator('12 + 9')).to.equal(21)
  })

  it('should handle negative numbers', () => {
    expect(tinyCalculator('1 + -9')).to.equal(-8)
  })

  it('should subtract numbers', () => {
    expect(tinyCalculator('1 - 1')).to.equal(0)
    expect(tinyCalculator('5 - 3')).to.equal(2)
    expect(tinyCalculator('5 - 2 - 1')).to.equal(2)
    expect(tinyCalculator('12 - 5')).to.equal(7)
    expect(tinyCalculator('1 - 9')).to.equal(-8)
  })

  it('should handle parens', () => {
    expect(tinyCalculator('5 - (2 + 1)')).to.equal(2)
    expect(tinyCalculator('5 - (2 - 1)')).to.equal(4)
  })
})
