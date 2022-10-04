import { constant } from '../function/constant'
import { map } from './map'
import { sum } from './sum'

export function length(
  iterator: Iterable<unknown> | { length: number } | { size: number }
): number {
  const isObject = typeof iterator === 'object'

  if (typeof iterator === 'string' || (isObject && 'length' in iterator)) {
    return iterator.length
  }

  if (isObject && 'size' in iterator) {
    return iterator.size
  }

  return sum(map(iterator, constant(1)))
}
