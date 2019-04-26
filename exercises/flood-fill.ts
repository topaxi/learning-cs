import { not } from '../utils/function/not'
import { filter } from '../utils/iterator'
import { isWithinMatrix } from '../utils/matrix'
import { Queue } from '../data-structures/queue/queue'

export function fill(
  screen: number[][],
  x: number,
  y: number,
  color: number
): number[][] {
  return floodQueue(screen, x, y, screen[y][x], color)
}

const boundaryCheck = not(isWithinMatrix)

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

  for (let [x, y] of filter(queue, isOldColor)) {
    screen[y][x] = newColor
    queue.enqueue([x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1])
  }

  return screen

  function isOldColor([x, y]: [number, number]): boolean {
    return screen[y] !== undefined && screen[y][x] === oldColor
  }
}
