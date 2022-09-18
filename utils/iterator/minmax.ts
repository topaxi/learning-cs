import { identity } from '../function/identity'
import { reduce } from './reduce'

function r<T>(
  iterator: Iterable<T>,
  project: (value: T) => any,
  compare: (
    a: ReturnType<typeof project>,
    b: ReturnType<typeof project>
  ) => boolean
): T {
  return reduce(iterator, (max, value) =>
    compare(project(value), project(max)) ? value : max
  )
}

export function max<T>(
  iterator: Iterable<T>,
  project: (value: T) => any = identity
): T {
  return r(iterator, project, (a, b) => a > b)
}

export function min<T>(
  iterator: Iterable<T>,
  project: (value: T) => any = identity
): T {
  return r(iterator, project, (a, b) => a < b)
}
