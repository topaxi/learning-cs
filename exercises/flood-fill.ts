import { Queue } from '../data-structures/queue/queue'

export function fill(
  screen: number[][],
  x: number,
  y: number,
  color: number
): number[][] {
  return floodQueue(screen, x, y, screen[y][x], color)
}

function boundaryCheck(screen: number[][], x: number, y: number) {
  return y < 0 || x < 0 || y >= screen.length || x >= screen[y].length
}

export function floodRecursive(
  screen: number[][],
  x: number,
  y: number,
  oldColor: number,
  newColor: number
): number[][] {
  if (boundaryCheck(screen, x, y)) return screen
  if (screen[y][x] !== oldColor) return screen

  screen[y][x] = newColor

  screen = floodRecursive(screen, x + 1, y, oldColor, newColor)
  screen = floodRecursive(screen, x, y + 1, oldColor, newColor)
  screen = floodRecursive(screen, x - 1, y, oldColor, newColor)
  screen = floodRecursive(screen, x, y - 1, oldColor, newColor)

  return screen
}

export function floodQueue(
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
