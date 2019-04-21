import { swap } from '../swap'
import { random } from '../random'
import { lastIndex } from './last-index'

export function shuffleInplace<T extends unknown[]>(
  array: T,
  i = 0,
  toIndex = lastIndex(array)
): T {
  for (; i < toIndex; i++) {
    swap(array, i, random(i, toIndex))
  }

  return array
}

export function shuffle<T>(array: readonly T[]): T[]
export function shuffle<T>(array: string): string[]
export function shuffle(array: readonly unknown[] | string): unknown[] {
  return shuffleInplace(Array.from(array))
}
