import { memoize, WeakSingleParamStore } from './memo'
import { random } from './random'
import { swap } from './swap'
import { add } from './operators'

function _tail<T>(list: [unknown, ...T[]]): readonly T[]
function _tail<T>(list: readonly T[]): readonly T[]
function _tail<T>(list: T[]): readonly T[]
function _tail(str: string): string
function _tail(
  list: readonly unknown[] | string
): readonly unknown[] | string {
  return list.slice(1)
}

export const tail = memoize(_tail, new WeakSingleParamStore())

export function head<T>(list: [T]): T
export function head<T>(list: [T, ...unknown[]]): T
export function head<T>(list: readonly T[]): T
export function head<T>(list: T[]): T
export function head<T>(list: string): string
export function head<T>(list: { 0: T }): T
export function head(
  list: readonly unknown[] | { 0: unknown } | string
): unknown {
  return list[0]
}

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

export function sum(array: readonly number[]): number {
  return array.reduce(add, 0)
}

export function lastIndex({ length }: { length: number }): number {
  return length - 1
}
