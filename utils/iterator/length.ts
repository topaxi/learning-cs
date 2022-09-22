import { constant } from '../function/constant'
import { map } from './map'
import { sum } from './sum'

export function length(
  iterator: Iterable<unknown> | { length: number }
): number {
  if (typeof iterator === 'object' && 'length' in iterator) {
    return iterator.length
  }

  return sum(map(iterator, constant(1)))
}
