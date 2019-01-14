import { range } from '../utils/range'

function fill(
  screen: number[][],
  x: number,
  y: number,
  color: number
): number[][] {
  return flood(screen, x, y, screen[y][x], color)
}

function flood(
  screen: number[][],
  x: number,
  y: number,
  oldColor: number,
  newColor: number
): number[][] {
  if (y < 0 || x < 0 || y >= screen.length || x >= screen[y].length) {
    return screen
  }

  if (screen[y][x] !== oldColor) {
    return screen
  }

  screen[y][x] = newColor

  screen = flood(screen, x + 1, y, oldColor, newColor)
  screen = flood(screen, x, y + 1, oldColor, newColor)
  screen = flood(screen, x - 1, y, oldColor, newColor)
  screen = flood(screen, x, y - 1, oldColor, newColor)

  return screen
}

console.log(
  fill(
    [
      [1, 1, 2, 2, 4, 4],
      [1, 2, 2, 2, 4, 5],
      [1, 2, 1, 4, 4, 5],
      [1, 1, 4, 4, 5, 4],
      [1, 1, 1, 1, 4, 4]
    ],
    1,
    3,
    9
  )
)
