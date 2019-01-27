import { expect } from 'chai'
import { commonArrayValues } from './common-array-values'

describe('commonArrayValues', () => {
  it('should return common array values', () => {
    expect(commonArrayValues([], [])).to.deep.equal([])
    expect(commonArrayValues([1], [])).to.deep.equal([])
    expect(commonArrayValues([1], [1])).to.deep.equal([1])
    expect(commonArrayValues([1, 2], [1])).to.deep.equal([1])
    expect(commonArrayValues([1, 2], [1, 3])).to.deep.equal([1])
    expect(commonArrayValues([1, 2], [1, 2])).to.deep.equal([1, 2])
    expect(commonArrayValues([1, 2], [1, 3, 2])).to.deep.equal([1, 2])
    expect(commonArrayValues([1, 2], [1, 3, 2], [2])).to.deep.equal([2])
  })
})
