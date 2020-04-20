import { concat } from './concat'

describe('utils/iterator/concat', () => {
  test('should concat iterators into one', () => {
    expect(Array.from(concat([1], [2, 3], [4]))).toEqual([1, 2, 3, 4])
  })
})
