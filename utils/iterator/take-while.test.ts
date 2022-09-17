import { takeWhile } from './take-while'

describe('iterator/take-while', () => {
  it('should emit values until callback fulfills', () => {
    expect(Array.from(takeWhile([0, 1, 2, 3, 4, 5], n => n < 3))).toEqual([
      0, 1, 2,
    ])

    expect(Array.from(takeWhile([0, 1, 2, 3, 4, 5], (_, i) => i < 3))).toEqual(
      [0, 1, 2]
    )
  })
})
