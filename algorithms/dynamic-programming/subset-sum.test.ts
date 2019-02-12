import { expect } from 'chai'
import { subsetSum } from './subset-sum'

describe('subsetSum', () => {
  it('should determine if there is a subset sum', () => {
    let list = [3, 34, 4, 12, 5, 2]

    expect(subsetSum(list, 1)).to.be.false
    expect(subsetSum(list, 2)).to.be.true
    expect(subsetSum(list, 3)).to.be.true
    expect(subsetSum(list, 4)).to.be.true
    expect(subsetSum(list, 5)).to.be.true
    expect(subsetSum(list, 6)).to.be.true
    expect(subsetSum(list, 7)).to.be.true
    expect(subsetSum(list, 8)).to.be.true
    expect(subsetSum(list, 9)).to.be.true
    expect(subsetSum(list, 10)).to.be.true
    expect(subsetSum(list, 11)).to.be.true
    expect(subsetSum(list, 12)).to.be.true
    expect(subsetSum(list, 13)).to.be.false
    expect(subsetSum(list, 14)).to.be.true
    expect(subsetSum(list, 15)).to.be.true
    expect(subsetSum(list, 16)).to.be.true
    expect(subsetSum(list, 17)).to.be.true
    expect(subsetSum(list, 18)).to.be.true
    expect(subsetSum(list, 19)).to.be.true
    expect(subsetSum(list, 20)).to.be.true
    expect(subsetSum(list, 21)).to.be.true
    expect(subsetSum(list, 22)).to.be.true
    expect(subsetSum(list, 23)).to.be.true
    expect(subsetSum(list, 24)).to.be.true
    expect(subsetSum(list, 25)).to.be.false
    expect(subsetSum(list, 26)).to.be.true
    expect(subsetSum(list, 27)).to.be.false
    expect(subsetSum(list, 28)).to.be.false
    expect(subsetSum(list, 29)).to.be.false
    expect(subsetSum(list, 30)).to.be.false
    expect(subsetSum(list, 31)).to.be.false
    expect(subsetSum(list, 32)).to.be.false
    expect(subsetSum(list, 33)).to.be.false
    expect(subsetSum(list, 34)).to.be.true
    expect(subsetSum(list, 35)).to.be.false
    expect(subsetSum(list, 36)).to.be.true
  })
})
