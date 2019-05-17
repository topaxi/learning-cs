import { returnTrue } from '../function/constant'
import { _find } from './-private/find'

export function some<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): boolean {
  return _find(iterator, predicate, returnTrue, false, thisArg)
}
