import { isIterable } from './is-iterable'

export function flat<T>(
  iterator: Iterable<Iterable<Iterable<Iterable<T>>>>,
  depth: 3
): IterableIterator<T>
export function flat<T>(
  iterator: Iterable<Iterable<Iterable<T>>>,
  depth: 2
): IterableIterator<T>
export function flat<T>(
  iterator: Iterable<Iterable<T>>,
  depth?: 1
): IterableIterator<T>
export function flat<T>(iterator: Iterable<T>, depth: 0): IterableIterator<T>
export function flat(
  iterator: Iterable<unknown>,
  depth?: number
): IterableIterator<unknown>
export function* flat(
  iterator: Iterable<unknown>,
  depth = 1
): IterableIterator<unknown> {
  if (depth < 0) return yield iterator

  for (let value of iterator) {
    if (isIterable(value)) {
      yield* flat(value, depth - 1)
    } else {
      yield value
    }
  }
}
