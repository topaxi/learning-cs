import { last } from './last'

describe('utils/iterator/last', () => {
  test('returns last value of iterable', () => {
    function* values() {
      yield 1
      yield 2
      yield 3
      yield 4
    }

    expect(last(values())).toBe(4)
    expect(last('hello')).toBe('o')
    expect(last([1, 2, 3])).toBe(3)
  })
})
