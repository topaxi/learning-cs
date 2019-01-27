import { memoize } from './memo'

export const tail = memoize<(<T>(list: ReadonlyArray<T>) => ReadonlyArray<T>)>(
  list => list.slice(1)
)

export const head = <T>(list: ReadonlyArray<T>): T => list[0]
