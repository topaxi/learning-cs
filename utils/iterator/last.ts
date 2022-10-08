import { lastIndex } from '../array/last-index'
import { consume } from './consume'

export function last<T>(iterator: Iterable<T>): T | undefined {
  if (Array.isArray(iterator) || typeof iterator === 'string') {
    return iterator[lastIndex(iterator)]
  }

  return consume(iterator)
}
