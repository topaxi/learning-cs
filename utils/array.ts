import { memoize, WeakSingleParamStore } from './memo'
import { random } from './random'
import { swap } from './swap'
import { add } from './operators'

function _tail<T>(list: [unknown, ...T[]]): ReadonlyArray<T>[]
function _tail<T>(list: ReadonlyArray<T>): ReadonlyArray<T>[]
function _tail<T>(list: T[]): ReadonlyArray<T>[]
function _tail(list: any): any {
  return list.slice(1)
}

export const tail = memoize(_tail, new WeakSingleParamStore())

export function head<T>(list: [T]): T
export function head<T>(list: [T, ...unknown[]]): T
export function head<T>(list: ReadonlyArray<T>): T
export function head<T>(list: T[]): T
export function head(list: any): any {
  return list[0]
}

export function shuffleInplace<T extends unknown[]>(array: T): T {
  let lastIndex = array.length - 1

  for (let i = 0; i < array.length; i++) {
    var rand = random(i, lastIndex)

    swap(array, rand, i)
  }

  return array
}

export function shuffle<T>(array: ReadonlyArray<T>): T[] {
  return shuffleInplace(Array.from(array))
}

export function sum(array: ReadonlyArray<number>): number {
  return array.reduce(add, 0)
}
