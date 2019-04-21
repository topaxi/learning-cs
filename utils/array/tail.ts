import { memoize } from '../function/memoize'

function _tail<T>(list: [unknown, ...T[]]): readonly T[]
function _tail<T>(list: readonly T[]): readonly T[]
function _tail<T>(list: T[]): readonly T[]
function _tail<T extends { slice(start: number, end?: number): T }>(list: T): T
function _tail(list: readonly unknown[]): readonly unknown[] {
  return list.slice(1)
}

export const tail = memoize.weak.unary(_tail)
