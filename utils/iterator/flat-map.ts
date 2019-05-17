import { prop } from '../object/prop'
import { isIterable } from './is-iterable'
import { withCallback } from './with-callback'

export function flatMap<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (
    this: This,
    value: T,
    i: number
  ) => Iterable<Iterable<Iterable<T>>>,
  depth: 3,
  thisArg?: This
): IterableIterator<U>
export function flatMap<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, value: T, i: number) => Iterable<Iterable<T>>,
  depth: 2,
  thisArg?: This
): IterableIterator<U>
export function flatMap<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, value: T, i: number) => Iterable<U>,
  depth?: 1,
  thisArg?: This
): IterableIterator<U>
export function flatMap<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, value: T, i: number) => U,
  depth: 0,
  thisArg?: This
): IterableIterator<U>
export function flatMap<This = undefined>(
  iterator: Iterable<unknown>,
  project: (this: This, value: unknown, i: number) => unknown,
  depth?: number,
  thisArg?: This
): IterableIterator<unknown>
export function* flatMap<This = undefined>(
  iterator: Iterable<unknown>,
  project: (
    this: This,
    value: unknown,
    i: number
  ) =>
    | unknown
    | Iterable<unknown>
    | Iterable<Iterable<unknown>>
    | Iterable<Iterable<Iterable<unknown>>>,
  depth = 1,
  thisArg?: This
): IterableIterator<unknown> {
  if (depth <= 0) return yield* iterator

  for (let value of withCallback(iterator, project, thisArg, prop('result'))) {
    if (isIterable(value)) {
      yield* flatMap(value, project, depth - 1, thisArg)
    } else {
      yield value
    }
  }
}
