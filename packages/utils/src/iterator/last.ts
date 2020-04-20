import { lastIndex } from '../array/last-index'

export function last<T>(iterator: Iterable<T>): T | undefined {
  if (Array.isArray(iterator) || typeof iterator === 'string') {
    return iterator[lastIndex(iterator)]
  }

  let last = undefined
  for (let value of iterator) last = value
  return last
}
