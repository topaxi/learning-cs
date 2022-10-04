import { length } from './length'

describe('utils/iterator/length', () => {
  test('returns length of iterable', () => {
    function* values() {
      yield 0
      yield 0
      yield 0
      yield 0
    }

    expect(length(values())).toBe(4)
    expect(length([0, 1, 2, 3])).toBe(4)
    expect(length(new Set([0, 1, 2, 3]))).toBe(4)
    expect(length('abcd')).toBe(4)
  })
})
