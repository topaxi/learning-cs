import { not } from '../utils/function/not'
import { filter } from '../utils/iterator'
import { isWithinMatrix } from '../utils/matrix'
import { Queue } from '../data-structures/queue/queue'

export function fill(
  screen: number[][],
  column: number,
  row: number,
  color: number
): number[][] {
  return floodQueue(screen, column, row, screen[row][column], color)
}

const boundaryCheck = not(isWithinMatrix)

export function floodRecursive(
  screen: number[][],
  column: number,
  row: number,
  oldColor: number,
  newColor: number
): number[][] {
  if (boundaryCheck(screen, column, row)) return screen
  if (screen[row][column] !== oldColor) return screen

  screen[row][column] = newColor

  screen = floodRecursive(screen, column + 1, row, oldColor, newColor)
  screen = floodRecursive(screen, column, row + 1, oldColor, newColor)
  screen = floodRecursive(screen, column - 1, row, oldColor, newColor)
  screen = floodRecursive(screen, column, row - 1, oldColor, newColor)

  return screen
}

export function floodQueue(
  screen: number[][],
  column: number,
  row: number,
  oldColor: number,
  newColor: number
): number[][] {
  let queue = new Queue<[number, number]>()

  if (screen[row][column] === newColor) return screen

  queue.enqueue([row, column])

  for (let [row, column] of filter(queue, isOldColor)) {
    screen[row][column] = newColor

    queue.enqueue(
      [row + 1, column],
      [row, column + 1],
      [row - 1, column],
      [row, column - 1]
    )
  }

  return screen

  function isOldColor([row, column]: [number, number]): boolean {
    return screen[row] !== undefined && screen[row][column] === oldColor
  }
}
