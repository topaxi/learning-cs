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

export function shuffle<T>(array: readonly T[]): T[]
export function shuffle<T>(array: string): string[]
export function shuffle<T>(array: Iterable<T>): T[]
export function shuffle(
  array: readonly unknown[] | string | Iterable<unknown>
): unknown[] {
  return shuffleInplace(Array.from(array))
}
