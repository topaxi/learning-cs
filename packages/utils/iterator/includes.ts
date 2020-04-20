import { eq } from '../filters/eq'
import { some } from './some'

export function includes<T>(iterator: Iterable<T>, value: T): boolean {
  return some(iterator, eq(value))
}
