import { paR } from '../function/partial'
import { entries } from './entries'

export function* take<T>(
  iterator: Iterable<T>,
  n: number
): IterableIterator<T> {
  if (n-- < 1) return

  for (let [i, value] of entries(iterator)) {
    yield value
    if (i >= n) return
  }
}

export const takeOne: <T>(iterator: Iterable<T>) => IterableIterator<T> = paR(
  take,
  1
)
