import { memoize } from '../function/memoize'

export interface Sliceable<T> {
  slice(start: number, end?: number): T
}

function _tail<T>(list: [unknown, ...T[]]): readonly T[]
function _tail<T>(list: readonly T[]): readonly T[]
function _tail<T>(list: Sliceable<T>): T
function _tail(list: readonly unknown[] | Sliceable<unknown>): unknown {
  return list.slice(1)
}

export const tail = memoize.weak.unary(_tail)
