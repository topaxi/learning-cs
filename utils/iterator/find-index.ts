import { prop } from '../object/prop'
import { _find } from './-private/find'

export function findIndex<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): number {
  return _find(iterator, predicate, prop('index'), -1, thisArg)
}
