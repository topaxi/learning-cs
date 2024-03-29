import { MemoTrie } from '../../data-structures/tree/memo-trie'
import { memo, Memoized, MemoStore } from './memoize'
import { c } from './compose'

// eslint-disable-next-line
type AnyFunction = (...args: any[]) => any

export const Y = <F extends AnyFunction>(m: (f: F) => F): F => {
  let f = m((<T>(...args: T[]) => f(...args)) as F)
  return f
}

export const mY = <F extends AnyFunction, M extends MemoStore = MemoTrie>(
  m: (f: F) => F,
  store: M = new MemoTrie() as unknown as M
): Memoized<F, M> => Object.assign(Y(c(m, memo(store))), { memo: store })
