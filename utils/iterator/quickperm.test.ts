import { quickperm } from '../iterator/quickperm'

describe('quickperm', () => {
  it('should generate every permutation of the given array', () => {
    expect(Array.from(quickperm([1, 2]))).toEqual([
      [1, 2],
      [2, 1],
    ])

    expect(Array.from(quickperm([1, 2, 3]))).toEqual([
      [1, 2, 3],
      [2, 1, 3],
      [3, 1, 2],
      [1, 3, 2],
      [2, 3, 1],
      [3, 2, 1],
    ])
  })
})
