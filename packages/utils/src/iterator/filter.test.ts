import { filter } from './filter'

describe('utils/iterator/filter', () => {
  test('should filter values from iterator', () => {
    function* values(length: number) {
      for (let i = 0; i < length; i++) yield i
    }

    expect(
      Array.from(filter(values(10), v => [4, 5, 6].includes(v)))
    ).toEqual([4, 5, 6])
  })
})
