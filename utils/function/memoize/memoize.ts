import { MemoTrie } from '../../../data-structures/tree/memo-trie'
import { SingleParamStore, WeakSingleParamStore } from './single-param-store'

export interface MemoStore {
  has(k: any[]): boolean
  get(k: any[]): any
  set(k: any[], value: any): any
  clear(): void
}

export type Memoized<
  T extends (...args: any[]) => any,
  M extends MemoStore = MemoTrie
> = T & { memo: M }

export function memoize<
  T extends (...args: any[]) => any,
  M extends MemoStore = MemoTrie
>(fn: T, store: M = new MemoTrie() as unknown as M): Memoized<T, M> {
  function memoized(this: unknown, ...args: unknown[]): ReturnType<T> {
    args.unshift(this)

    if (memoized.memo.has(args)) {
      return memoized.memo.get(args)
    }

    // eslint-disable-next-line
    let r = fn.apply(this, arguments as any)
    memoized.memo.set(args, r)
    return r
  }

  if (fn.name !== '') {
    Object.defineProperty(memoized, 'name', {
      value: `memoized(${fn.name})`,
    })
  }

  memoized.memo = store

  return memoized as Memoized<T, M>
}

memoize.weak = {
  unary: function memoizeWeakUnary<T, R>(
    fn: (arg: T) => R
  ): Memoized<typeof fn, WeakSingleParamStore<[T], R>> {
    return memoize(fn, new WeakSingleParamStore())
  },
}

memoize.unary = function memoizeUnary<T, R>(
  fn: (arg: T) => R
): Memoized<typeof fn, SingleParamStore<[T], R>> {
  return memoize(fn, new SingleParamStore())
}

export const memo =
  <F extends (...args: unknown[]) => unknown, M extends MemoStore = MemoTrie>(
    store?: M
  ) =>
  (f: F) =>
    memoize(f, store)
