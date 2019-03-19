import { fill } from './flood-fill'

describe('FloodFill', () => {
  test('should flood fill', () => {
    let input = [
      [1, 1, 2, 2, 4, 4],
      [1, 2, 2, 2, 4, 5],
      [1, 2, 1, 4, 4, 5],
      [1, 1, 4, 4, 5, 4],
      [1, 1, 1, 1, 4, 4]
    ]
    let expected = [
      [9, 9, 2, 2, 4, 4],
      [9, 2, 2, 2, 4, 5],
      [9, 2, 1, 4, 4, 5],
      [9, 9, 4, 4, 5, 4],
      [9, 9, 9, 9, 4, 4]
    ]

    expect(fill(input, 1, 3, 9)).toEqual(expected)
  })
})
