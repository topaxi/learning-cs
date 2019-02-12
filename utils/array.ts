import { memoize, SingleParamStore } from './memo'

export const tail = memoize<(<T>(list: ReadonlyArray<T>) => ReadonlyArray<T>)>(
  list => list.slice(1),
  new SingleParamStore()
)

export const head = <T>(list: ReadonlyArray<T>): T => list[0]
