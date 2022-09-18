import { HashSet } from '../data-structures/hash/hash-set'
import { max } from '../utils/iterator/minmax'

export function maxAreaOfIsland(grid: number[][]): number {
  let seen = new HashSet()
  let maxArea = 0

  function visit(row: number, column: number): number {
    if (row < 0 || column < 0) return 0
    if (column >= grid.length || row >= grid[column].length) return 0
    if (grid[column][row] === 0) return 0
    if (seen.has(`${row}x${column}`)) return 0

    seen.add(`${row}x${column}`)

    return (
      1 +
      visit(row - 1, column) +
      visit(row, column - 1) +
      visit(row + 1, column) +
      visit(row, column + 1)
    )
  }

  for (let column = 0; column < grid.length; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      maxArea = max([maxArea, visit(row, column)])
    }
  }

  return maxArea
}
