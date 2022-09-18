import { identity } from '../function/identity'
import { reduce } from './reduce'

export function max<T>(
  iterator: Iterable<T>,
  project: (value: T) => any = identity
): T {
  return reduce(iterator, (max, value) =>
    project(value) > project(max) ? value : max
  )
}
