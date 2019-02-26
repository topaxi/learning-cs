import { HashMap } from './hash-map'

export class HashSet<T extends string | number> {
  private _hash = new HashMap<T, T>(this._hashSize)

  static of<T extends string | number>(...args: T[]) {
    let set = new this<T>()

    for (let value of args) {
      set.add(value)
    }

    return set
  }

  static from<T extends string | number>(iterable: Iterable<T>) {
    return this.of(...iterable)
  }

  constructor(private readonly _hashSize = 32) {}

  get size(): number {
    return this._hash.size
  }

  has(value: T): boolean {
    return this._hash.has(value)
  }

  add(value: T): this {
    this._hash.set(value, value)
    return this
  }

  delete(value: T): this {
    this._hash.delete(value)
    return this
  }

  clear(): this {
    this._hash = new HashMap(this._hashSize)

    return this
  }

  union(...iterables: Array<Iterable<T>>): HashSet<T> {
    let set = HashSet.from(this)

    for (let i = 0; i < iterables.length; i++) {
      for (let value of iterables[i]) {
        set.add(value)
      }
    }

    return set
  }

  difference(...iterables: Array<Iterable<T>>): HashSet<T> {
    let set = HashSet.from(this)

    for (let i = 0; i < iterables.length; i++) {
      for (let value of iterables[i]) {
        set.delete(value)
      }
    }

    return set
  }

  intersection(...iterables: Array<Iterable<T>>): HashSet<T> {
    let set = HashSet.from(this)

    for (let value of set) {
      if (!iterables.every(iterable => has(iterable, value))) {
        set.delete(value)
      }
    }

    return set
  }

  *[Symbol.iterator](): IterableIterator<T> {
    yield* this._hash.values()
  }

  toArray(): T[] {
    return [...this]
  }
}

function has(
  iterable:
    | { has(key: any): boolean }
    | { includes(key: any): boolean }
    | Iterable<any>,
  key: any
): boolean {
  if (Reflect.has(iterable, 'has')) return (iterable as any).has(key)
  if (Reflect.has(iterable, 'includes')) return (iterable as any).includes(key)

  for (let value of iterable as any) {
    if (value === key) return true
  }

  return false
}
