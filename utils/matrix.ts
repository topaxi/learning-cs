export function isWithinMatrix(
  matrix: ReadonlyArray<ReadonlyArray<number>>,
  row: number,
  column: number
): boolean {
  return (
    row > -1 &&
    column > -1 &&
    row < matrix.length &&
    column < matrix[row].length
  )
}
