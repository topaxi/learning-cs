import { deduplicateInPlace } from './deduplicate-in-place'

describe('deduplicateInPlace', () => {
  test('should remove duplicates in array', () => {
    let array = [1, 1, 2, 4, 5, 6, 5, 4, 4]

    deduplicateInPlace(array)

    expect(array).toEqual([1, 2, 4, 5, 6])
  })
})
