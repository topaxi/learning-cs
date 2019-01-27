import { expect } from 'chai'
import { subsetSum } from './subset-sum'

describe('subsetSum', () => {
  it('should determen if there is a subset sum', () => {
    expect(subsetSum([3, 34, 4, 12, 5, 2], 1)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 2)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 3)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 4)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 5)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 6)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 7)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 8)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 9)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 10)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 11)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 12)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 13)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 14)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 15)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 16)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 17)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 18)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 19)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 20)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 21)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 22)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 23)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 24)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 25)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 26)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 27)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 28)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 29)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 30)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 31)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 32)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 33)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 34)).to.be.true
    expect(subsetSum([3, 34, 4, 12, 5, 2], 35)).to.be.false
    expect(subsetSum([3, 34, 4, 12, 5, 2], 36)).to.be.true
  })
})
