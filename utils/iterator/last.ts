import { lastIndex } from '../array/last-index'

export function last<T>(iterator: Iterable<T>): T | undefined {
  if (Array.isArray(iterator) || typeof iterator === 'string') {
    return iterator[lastIndex(iterator)]
  }

  let value
  for (value of iterator);
  return value
}
