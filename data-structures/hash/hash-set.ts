import { flat } from '../../utils/iterator/flat'
import { includes } from '../../utils/iterator/includes'
import { length } from '../../utils/iterator/length'
import { max } from '../../utils/iterator/minmax'
import { HashMap, Hashable } from './hash-map'

export class HashSet<T extends Hashable> implements Iterable<T> {
  private _hash: HashMap<T, T>

  private static defaultSetSize = 32

  static of<T extends Hashable>(...args: T[]) {
    let set = new this<T>(max([this.defaultSetSize, args.length]))

    for (let value of args) {
      set.add(value)
    }

    return set
  }

  static from<T extends Hashable>(iterable: Iterable<T>) {
    return this.of(...iterable)
  }

  constructor(hashSize = HashSet.defaultSetSize) {
    this._hash = new HashMap(hashSize)
  }

  get size(): number {
    return length(this._hash)
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

    for (let value of flat(iterables)) {
      set.add(value)
    }

    return set
  }

  difference(...iterables: Array<Iterable<T>>): HashSet<T> {
    let set = HashSet.from(this)

    for (let value of flat(iterables)) {
      set.delete(value)
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
