import { range } from '../utils/range'
import { Queue } from '../data-structures/queue/queue'

function fill(
  screen: number[][],
  x: number,
  y: number,
  color: number
): number[][] {
  return floodQ(screen, x, y, screen[y][x], color)
}

function floodR(
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

  screen = floodR(screen, x + 1, y, oldColor, newColor)
  screen = floodR(screen, x, y + 1, oldColor, newColor)
  screen = floodR(screen, x - 1, y, oldColor, newColor)
  screen = floodR(screen, x, y - 1, oldColor, newColor)

  return screen
}

function floodQ(
  screen: number[][],
  x: number,
  y: number,
  oldColor: number,
  newColor: number
): number[][] {
  let queue = new Queue<[number, number]>()

  if (screen[y][x] === newColor) return screen

  queue.enqueue([x, y])

  while (!queue.empty) {
    ;[x, y] = queue.dequeue()

    screen[y][x] = newColor

    if (isOldColor(x + 1, y)) queue.enqueue([x + 1, y])
    if (isOldColor(x, y + 1)) queue.enqueue([x, y + 1])
    if (isOldColor(x - 1, y)) queue.enqueue([x - 1, y])
    if (isOldColor(x, y - 1)) queue.enqueue([x, y - 1])
  }

  return screen

  function isOldColor(x: number, y: number) {
    return screen[y] !== undefined && screen[y][x] === oldColor
  }
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
