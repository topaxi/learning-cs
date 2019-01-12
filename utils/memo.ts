export type MemoStore = {
  has(k: any): boolean
  get(k: any): any
  set(k: any, value: any): any
}

export function memoize<T extends (a: any) => any>(
  fn: T,
  store: MemoStore = new WeakMap<any, any>()
): T {
  function memoized(this: any, a: any): any {
    if (memoized.memo.has(a)) return memoized.memo.get(a)

    let r = fn.call(this, a)
    memoized.memo.set(a, r)
    return r
  }

  memoized.memo = store

  return memoized as any
}
