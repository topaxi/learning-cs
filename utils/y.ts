import { memoize, MemoizedFunction, MemoStore } from './memo'
import { MemoTrie } from '../data-structures/tree/memo-trie'

const identity = <T>(x: T): T => x

// eslint-disable-next-line
type AnyFunction = (...args: any[]) => any

export const Y = <F extends AnyFunction, D extends (f: F) => F = (f: F) => F>(
  m: (f: F) => F,
  decorate: D = identity as D
): ReturnType<D> => {
  let f = m(decorate((<T>(...args: T[]): ReturnType<F> => f(...args)) as F))
  return f as ReturnType<D>
}

export const memoizedY = <
  F extends AnyFunction,
  M extends MemoStore = MemoTrie
>(
  m: (f: F) => F,
  store?: M
): MemoizedFunction<F, M> => Y(m, f => memoize(f, store))
