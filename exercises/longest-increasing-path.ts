import { memoizedY } from '../utils'

export function longestIncreasingPath(matrix: number[][]): number {
  let longestPath = 0

  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      longestPath = Math.max(
        longestPath,
        measureLongestPath(matrix, row, column, -1)
      )
    }
  }

  return longestPath
}

function failsBoundaryCheck(
  matrix: number[][],
  row: number,
  column: number
): boolean {
  return (
    row < 0 ||
    column < 0 ||
    row >= matrix.length ||
    column >= matrix[row].length
  )
}

const measureLongestPath = memoizedY(
  measureLongestPath => (
    matrix: number[][],
    row: number,
    column: number,
    prevValue: number
  ): number => {
    if (failsBoundaryCheck(matrix, row, column)) return 0
    if (matrix[row][column] <= prevValue) return 0

    return (
      1 +
      Math.max(
        measureLongestPath(matrix, row - 1, column, matrix[row][column]),
        measureLongestPath(matrix, row, column + 1, matrix[row][column]),
        measureLongestPath(matrix, row + 1, column, matrix[row][column]),
        measureLongestPath(matrix, row, column - 1, matrix[row][column])
      )
    )
  }
)
