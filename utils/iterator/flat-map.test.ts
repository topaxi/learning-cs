import { flatMap } from './flat-map'

describe('utils/iterator/flat-map', () => {
  test('should map and flatten iterable', () => {
    expect(
      Array.from(
        flatMap([1, 2, 3, 4], function*(n) {
          yield n * n
        })
      )
    ).toEqual([1, 4, 9, 16])

    expect(Array.from(flatMap([1, 2, 3, 4], n => [n, n]))).toEqual([
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4
    ])
  })

  test('should map and flatten iterable with mixed return values', () => {
    expect(
      Array.from(
        flatMap([1, 2, 3, 4], function*(n) {
          yield n * n
        })
      )
    ).toEqual([1, 4, 9, 16])

    expect(
      Array.from(flatMap([1, 2, 3, 4], n => (n % 2 ? n : [n, n])))
    ).toEqual([1, 2, 2, 3, 4, 4])
  })

  test('should map and flatten deeply', () => {
    expect(
      Array.from(flatMap([1, 2], n => [n, [n, n, [n, n, [n]]]], 0))
    ).toEqual([[1, [1, 1, [1, 1, [1]]]], [2, [2, 2, [2, 2, [2]]]]])
    expect(
      Array.from(flatMap([1, 2], n => [n, [n, n, [n, n, [n]]]], 1))
    ).toEqual([1, [1, 1, [1, 1, [1]]], 2, [2, 2, [2, 2, [2]]]])
    expect(
      Array.from(flatMap([1, 2], n => [n, [n, n, [n, n, [n]]]], 2))
    ).toEqual([1, 1, 1, [1, 1, [1]], 2, 2, 2, [2, 2, [2]]])
    expect(
      Array.from(flatMap([1, 2], n => [n, [n, n, [n, n, [n]]]], 3))
    ).toEqual([1, 1, 1, 1, 1, [1], 2, 2, 2, 2, 2, [2]])
    expect(
      Array.from(flatMap([1, 2], n => [n, [n, n, [n, n, [n]]]], 4))
    ).toEqual([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2])
    expect(
      Array.from(flatMap([1, 2], n => [n, [n, n, [n, n, [n]]]], Infinity))
    ).toEqual([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2])
  })
})
