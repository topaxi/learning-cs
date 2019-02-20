import { memoize, WeakSingleParamStore } from './memo'

function _tail<T>(list: [any, ...T[]]): ReadonlyArray<T>[]
function _tail<T>(list: ReadonlyArray<T>): ReadonlyArray<T>[]
function _tail<T>(list: T[]): ReadonlyArray<T>[]
function _tail(list: any): any {
  return list.slice(1)
}

export const tail = memoize(_tail, new WeakSingleParamStore())

export function head<T>(list: [T]): T
export function head<T>(list: [T, ...any[]]): T
export function head<T>(list: ReadonlyArray<T>): T
export function head<T>(list: T[]): T
export function head(list: any): any {
  return list[0]
}
