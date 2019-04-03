import { iter } from '../../utils'
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
      if (!iterables.every(has(value))) {
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

function isSetLike<T>(iterable: object): iterable is { has(key: T): boolean } {
  return Reflect.has(iterable, 'has')
}

function isArrayLike<T>(
  iterable: object
): iterable is { includes(key: T): boolean } {
  return Reflect.has(iterable, 'includes')
}

function has<T>(
  key: T
): (
  iterable:
    | { has(key: T): boolean }
    | { includes(key: T): boolean }
    | Iterable<T>
) => boolean {
  return iterable => {
    if (isSetLike(iterable)) return iterable.has(key)
    if (isArrayLike(iterable)) return iterable.includes(key)

    return iter.includes(iterable, key)
  }
}
