import { pa } from './partial'

export function arity<T, U, V, R>(
  n: 3,
  fn: (v0: T, v1: U, v3: V) => R
): (v0: T, v1: U, v3: V) => R
export function arity<T, U, R>(
  n: 2,
  fn: (v0: T, v1: U) => R
): (v0: T, v1: U) => R
export function arity<T, R>(n: 1, fn: (value: T) => R): (value: T) => R
export function arity<R>(n: 0, fn: () => R): () => R
export function arity<T>(
  n: number,
  fn: (...args: any[]) => T
): (...args: unknown[]) => T
export function arity<T>(
  n: number,
  fn: (...args: any[]) => T
): (...args: unknown[]) => T {
  return (...args: unknown[]) => fn(...args.slice(0, n))
}

export const arity1 = pa(arity, 1)
export const arity2 = pa(arity, 2)
export const arity3 = pa(arity, 3)
