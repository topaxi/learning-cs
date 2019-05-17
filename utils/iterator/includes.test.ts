import { includes } from './includes'

describe('utils/iterator/includes', () => {
  test('should return true if the given value is found in the iterable', () => {
    let a = [1, 2, 3, 4]

    expect(includes(a, 4)).toBe(true)
    expect(includes(a, 5)).toBe(false)
  })
})
