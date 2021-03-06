import { withCallback, result } from './with-callback'

export function map<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, t: T, i: number) => U,
  thisArg?: This
): IterableIterator<U> {
  return withCallback(iterator, project, thisArg, result)
}
