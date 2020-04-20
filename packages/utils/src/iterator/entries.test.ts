import { entries } from './entries'

describe('utils/iterator/entries', () => {
  test('should iterate over values with index', () => {
    function* values() {
      yield 'a'
      yield 'b'
      yield 'c'
    }

    expect(Array.from(entries(values()))).toEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ])
  })
})
