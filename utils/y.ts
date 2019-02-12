import { memoize, MemoStore } from './memo'

export const Y = <F extends Function>(m: (f: F) => F) => {
  const f = m(((...args: any[]): any => f(...args)) as any)
  return f
}

export const memoizedY = <F extends Function>(
  m: (f: F) => F,
  store?: MemoStore
): F & { memo: MemoStore } => {
  const f: any = m(memoize((...args: any[]): any => f(...args), store) as any)
  return f
}
