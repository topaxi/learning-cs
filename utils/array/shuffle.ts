import { swap } from '../swap'
import { range } from '../range'
import { random } from '../random'
import { lastIndex } from './last-index'

export function shuffleInplace<T extends unknown[]>(
  array: T,
  start = 0,
  end = lastIndex(array)
): T {
  for (let i of range(start, end)) {
    swap(array, i, random(i, end))
  }

  return array
}

export function shuffle<T>(array: Iterable<T>): T[] {
  return shuffleInplace(Array.from(array))
}
