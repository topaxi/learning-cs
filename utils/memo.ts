import { MemoTrie } from '../data-structures/tree/memo-trie'
import { ClearableWeakmap } from './clearable-weakmap'

export class SingleParamStore<T extends any[], U> extends Map<T, U> {
  get(key: T) {
    return super.get(key[0])
  }

  set(key: T, value: U) {
    return super.set(key[0], value)
  }

  has(key: T) {
    return super.has(key[0])
  }
}

export class WeakSingleParamStore<T extends any[], U> extends ClearableWeakmap<
  T,
  U
> {
  get(key: T) {
    return super.get(key[0])
  }

  set(key: T, value: U) {
    return super.set(key[0], value)
  }

  has(key: T) {
    return super.has(key[0])
  }
}

export type MemoStore = {
  has(k: any[]): boolean
  get(k: any[]): any
  set(k: any[], value: any): any
  clear(): void
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  store: MemoStore = new MemoTrie()
): T & { memo: MemoStore } {
  function memoized(this: any, ...args: any[]): any {
    if (memoized.memo.has(args)) return memoized.memo.get(args)

    let r = fn.apply(this, args)
    memoized.memo.set(args, r)
    return r
  }

  memoized.memo = store

  return memoized as any
}
