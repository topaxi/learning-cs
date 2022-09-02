import { range } from '../utils/range'
import { swap } from '../utils/swap'

function swapDiagonal(obj: number[][], a: number, b: number): void {
  ;[obj[b]![a]!, obj[a]![b]!] = [obj[a]![b]!, obj[b]![a]!]
}

export function rotateSquareMatrix<T extends number[][]>(matrix: T): T {
  for (let row of range(matrix.length)) {
    for (let column of range(row + 1, matrix.length)) {
      swapDiagonal(matrix, row, column)
    }
  }

  for (let row of range(matrix.length)) {
    for (let column of range(matrix.length / 2)) {
      swap(matrix[row]!, column, matrix.length - column - 1)
    }
  }

  return matrix
}
