import { flipAndInvertImage } from './flip-and-invert'

describe('832. Flipping an Image', () => {
  test('should flip and invert image', () => {
    expect(
      flipAndInvertImage([
        [1, 1, 0],
        [1, 0, 1],
        [0, 0, 0],
      ])
    ).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ])
  })
})
