import { findIndex } from './find-index'

describe('utils/iterator/find-index', () => {
  test('should return the found value', () => {
    let a = [1, 2, 3, 4, 5, 6]

    expect(findIndex(a, v => v === 4)).toBe(3)
    expect(findIndex(a, v => v === 9)).toBe(-1)
  })
})
