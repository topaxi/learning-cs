import { entries } from './entries'

export function* skip<T>(
  iterator: Iterable<T>,
  n: number
): IterableIterator<T> {
  for (let [i, value] of entries(iterator)) {
    if (i < n) continue
    yield value
  }
}
