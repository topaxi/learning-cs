import { not } from '../function/not'
import { some } from './some'

export function every<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): boolean {
  return !some(iterator, not(predicate), thisArg)
}
