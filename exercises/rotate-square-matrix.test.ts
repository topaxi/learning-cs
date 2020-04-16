import { rotateSquareMatrix } from './rotate-square-matrix'

describe('rotateSquareMatrix()', () => {
  test('should rotate square matrix', () => {
    let matrix = [
      [1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4],
      [5, 5, 5, 5, 5],
    ]

    expect(rotateSquareMatrix(matrix)).toEqual([
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
      [5, 4, 3, 2, 1],
    ])

    matrix = [
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4],
    ]

    expect(rotateSquareMatrix(matrix)).toEqual([
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
    ])

    matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    expect(rotateSquareMatrix(matrix)).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ])

    matrix = [
      [1, 2],
      [3, 4],
    ]

    expect(rotateSquareMatrix(matrix)).toEqual([
      [3, 1],
      [4, 2],
    ])

    matrix = [[1]]

    expect(rotateSquareMatrix(matrix)).toEqual([[1]])
  })
})
