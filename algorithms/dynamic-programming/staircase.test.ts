import { expect } from 'chai'
import { staircase_naive, staircase_memo } from './staircase'

describe('staircase', () => {
  it('should count number of ways to walk up staircase', () => {
    expect(staircase_naive(1)).to.equal(1)
    expect(staircase_naive(2)).to.equal(2)
    expect(staircase_naive(3)).to.equal(3)
    expect(staircase_naive(4)).to.equal(5)
    expect(staircase_naive(10)).to.equal(89)
  })
})

describe('staircase_memo', () => {
  it('should count number of ways to walk up staircase', () => {
    expect(staircase_memo(1)).to.equal(1)
    expect(staircase_memo(2)).to.equal(2)
    expect(staircase_memo(3)).to.equal(3)
    expect(staircase_memo(4)).to.equal(5)
    expect(staircase_memo(10)).to.equal(89)
    expect(staircase_memo(100)).to.equal(573147844013817200000)
  })
})
