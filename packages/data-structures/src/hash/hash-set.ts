import { includes } from '@topaxi/lcs-utils/iterator/includes'
import { HashMap, Hashable } from './hash-map'

const { max } = Math

export class HashSet<T extends Hashable> implements Iterable<T> {
  private _hash = new HashMap<T, T>(this._hashSize)

  private static defaultSetSize = 32

  static of<T extends Hashable>(...args: T[]) {
    let set = new this<T>(max(this.defaultSetSize, args.length))

    for (let value of args) {
      set.add(value)
    }

    return set
  }

  static from<T extends Hashable>(iterable: Iterable<T>) {
    return this.of(...iterable)
  }

  constructor(private readonly _hashSize = HashSet.defaultSetSize) {}

  get size(): number {
    return this._hash.size
  }

  get empty(): boolean {
    return this._hash.empty
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
    this._hash.clear()

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

  keys(): IterableIterator<T> {
    return this.values()
  }

  values(): IterableIterator<T> {
    return this._hash.values()
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values()
  }

  toArray(): T[] {
    return [...this]
  }

  toJSON(): T[] {
    return this.toArray()
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

    return includes(iterable, key)
  }
}
