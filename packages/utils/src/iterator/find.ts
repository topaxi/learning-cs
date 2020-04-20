import { value } from './with-callback'
import { _find } from './-private/find'

export function find<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): T | null {
  return _find(iterator, predicate, value, null, thisArg)
}
