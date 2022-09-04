import { memoize } from '../function/memoize'

export interface Sliceable<T> {
  slice(start: number, end?: number): T
}

export interface TailFunction {
  <T>(list: [unknown, ...T[]]): readonly T[]
  <T>(list: readonly T[]): readonly T[]
  <T>(list: Sliceable<T>): T
}

function _tail<T>(list: [unknown, ...T[]]): readonly T[]
function _tail<T>(list: readonly T[]): readonly T[]
function _tail<T>(list: Sliceable<T>): T
function _tail(list: readonly unknown[] | Sliceable<unknown>): unknown {
  return list.slice(1)
}

const memoTail = memoize.weak.unary(_tail)

export const tail = (list => {
  if (typeof list !== 'object') return _tail(list)

  return memoTail(list)
}) as TailFunction
