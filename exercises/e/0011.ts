import { max } from '../../utils/iterator/minmax'

function getLargestProduct(grid: number[][], x: number, y: number) {
  function get(x: number, y: number) {
    return grid[y]?.[x] ?? 1
  }

  return max([
    get(x, y) * get(x + 1, y) * get(x + 2, y) * get(x + 3, y),
    get(x, y) * get(x, y + 1) * get(x, y + 2) * get(x, y + 3),
    get(x, y) * get(x + 1, y + 1) * get(x + 2, y + 2) * get(x + 3, y + 3),
    get(x, y) * get(x - 1, y + 1) * get(x - 2, y + 2) * get(x - 3, y + 3),
  ])
}

export function solve(grid: string): number {
  const values = grid
    .trim()
    .split('\n')
    .map(r => r.split(' ').map(n => parseInt(n, 10)))

  return max(
    values
      .flatMap((r, y) => r.map((_value, x) => ({ x, y })))
      .map(({ x, y }) => getLargestProduct(values, x, y))
  )
}
