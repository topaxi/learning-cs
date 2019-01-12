import { memoize, MemoStore } from './memo'

export const Y = (m: <F extends Function>(f: F) => any) => {
  const f = m((...args: any[]): any => f(...args))
  return f
}

export const memoizedY = (
  m: <F extends Function>(f: F) => any,
  store?: MemoStore
) => {
  const f = m(memoize((...args: any[]): any => f(...args), store))
  return f
}
