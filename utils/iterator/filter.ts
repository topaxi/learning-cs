import { withCallback } from './with-callback'

export function filter<T, S extends T, This = undefined>(
  iterator: Iterable<T>,
  filter: (this: This, value: T, index: number) => value is S,
  thisArg?: This
): IterableIterator<S>
export function filter<T, This = undefined>(
  iterator: Iterable<T>,
  filter: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T>
export function* filter<T, This = undefined>(
  iterator: Iterable<T>,
  filter: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T> {
  for (let { result, value } of withCallback(iterator, filter, thisArg))
    if (result) yield value
}
