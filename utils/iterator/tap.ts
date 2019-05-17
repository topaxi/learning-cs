import { prop } from '../object/prop'
import { withCallback } from './with-callback'

export function tap<T, This = undefined>(
  iterable: Iterable<T>,
  fn: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T> {
  return withCallback(iterable, fn, thisArg, prop('value'))
}
