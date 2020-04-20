import { commonArrayValues } from './common-array-values'

describe('commonArrayValues', () => {
  test('should return common array values', () => {
    expect(commonArrayValues([], [])).toEqual([])
    expect(commonArrayValues([1], [])).toEqual([])
    expect(commonArrayValues([1], [1])).toEqual([1])
    expect(commonArrayValues([1, 2], [1])).toEqual([1])
    expect(commonArrayValues([1, 2], [1, 3])).toEqual([1])
    expect(commonArrayValues([1, 2], [1, 2])).toEqual([1, 2])
    expect(commonArrayValues([1, 2], [1, 3, 2])).toEqual([1, 2])
    expect(commonArrayValues([1, 2], [1, 3, 2], [2])).toEqual([2])
  })
})
