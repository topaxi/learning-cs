import { pa } from './partial'

export type NullaryFunction<R> = () => R
export type UnaryFunction<T, R> = (v0: T) => R
export type BinaryFunction<T, U, R> = (v0: T, v1: U) => R
export type TernaryFunction<T, U, V, R> = (v0: T, v1: U, v2: V) => R
export type NAryFunction<T, R> = (...args: T[]) => R

export type AsNullaryFunction = <R>(
  fn: NullaryFunction<R>
) => NullaryFunction<R>
export type AsUnaryFunction = <T, R>(
  fn: UnaryFunction<T, R>
) => UnaryFunction<T, R>
export type AsBinaryFunction = <T, U, R>(
  fn: BinaryFunction<T, U, R>
) => BinaryFunction<T, U, R>
export type AsTernaryFunction = <T, U, V, R>(
  fn: TernaryFunction<T, U, V, R>
) => TernaryFunction<T, U, V, R>

export function arity<T, U, V, R>(
  n: 3,
  fn: TernaryFunction<T, U, V, R>
): TernaryFunction<T, U, V, R>
export function arity<T, U, R>(
  n: 2,
  fn: BinaryFunction<T, U, R>
): BinaryFunction<T, U, R>
export function arity<T, R>(n: 1, fn: UnaryFunction<T, R>): UnaryFunction<T, R>
export function arity<R>(n: 0, fn: NullaryFunction<R>): NullaryFunction<R>
export function arity<T>(
  n: number,
  fn: NAryFunction<any, T>
): NAryFunction<unknown, T>
export function arity<T>(
  n: number,
  fn: NAryFunction<any, T>
): NAryFunction<unknown, T> {
  return Object.defineProperty(
    (...args: unknown[]) => fn(...args.slice(0, n)),
    'length',
    { value: n }
  )
}

export const arity0 = pa(arity, 0) as AsNullaryFunction
export const arity1 = pa(arity, 1) as AsUnaryFunction
export const arity2 = pa(arity, 2) as AsBinaryFunction
export const arity3 = pa(arity, 3) as AsTernaryFunction
