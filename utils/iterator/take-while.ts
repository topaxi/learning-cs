import { entries } from './entries'

export function* takeWhile<T>(
  iterator: Iterable<T>,
  callback: (value: T, i: number) => boolean
): IterableIterator<T> {
  for (let [i, value] of entries(iterator)) {
    if (!callback(value, i)) return
    yield value
  }
}
