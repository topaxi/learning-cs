import { prop } from '../object/prop'
import { _find } from './-private/find'

export function find<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): T | null {
  return _find(iterator, predicate, prop('value'), null, thisArg)
}