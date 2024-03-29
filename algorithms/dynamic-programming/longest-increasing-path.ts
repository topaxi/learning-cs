import { not } from '../../utils/function/not'
import { mY } from '../../utils/function/y'
import { range } from '../../utils/range'
import { isWithinMatrix } from '../../utils/matrix'
import { max } from '../../utils/iterator/minmax'

const failsBoundaryCheck = not(isWithinMatrix)

const measureLongestPath = mY(
  measureLongestPath =>
    (
      matrix: number[][],
      row: number,
      column: number,
      prevValue: number
    ): number => {
      if (failsBoundaryCheck(matrix, row, column)) return 0
      if (matrix[row][column] <= prevValue) return 0

      return (
        1 +
        max([
          measureLongestPath(matrix, row - 1, column, matrix[row][column]),
          measureLongestPath(matrix, row, column + 1, matrix[row][column]),
          measureLongestPath(matrix, row + 1, column, matrix[row][column]),
          measureLongestPath(matrix, row, column - 1, matrix[row][column]),
        ])
      )
    }
)

export function longestIncreasingPath(matrix: number[][]): number {
  let longestPath = 0

  for (let row of range(matrix.length)) {
    for (let column of range(matrix[row].length)) {
      longestPath = max([
        longestPath,
        measureLongestPath(matrix, row, column, -1),
      ])
    }
  }

  return longestPath
}
