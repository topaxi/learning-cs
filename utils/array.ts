import { memoize, WeakSingleParamStore } from './memo'
import { random } from './random'
import { swap } from './swap'
import { add } from './operators'

function _tail<T>(list: [unknown, ...T[]]): readonly T[][]
function _tail<T>(list: readonly T[]): readonly T[][]
function _tail<T>(list: T[]): readonly T[][]
function _tail(list: any): any {
  return list.slice(1)
}

export const tail = memoize(_tail, new WeakSingleParamStore())

export function head<T>(list: [T]): T
export function head<T>(list: [T, ...unknown[]]): T
export function head<T>(list: readonly T[]): T
export function head<T>(list: T[]): T
export function head(list: any): any {
  return list[0]
}

export function shuffleInplace<T extends unknown[]>(
  array: T,
  i = 0,
  lastIndex = array.length - 1
): T {
  for (; i < array.length; i++) {
    swap(array, i, random(i, lastIndex))
  }

  return array
}

export function shuffle<T>(array: readonly T[]): T[] {
  return shuffleInplace(Array.from(array))
}

export function sum(array: readonly number[]): number {
  return array.reduce(add, 0)
}
