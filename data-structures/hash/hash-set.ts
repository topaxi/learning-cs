import { HashMap } from './hash-map'

export class HashSet<T extends string | number> {
  private _hash = new HashMap<T, T>(this.size)

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

  constructor(private readonly size = 32) {}

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

  *[Symbol.iterator](): IterableIterator<T> {
    for (let value of this._hash.values()) {
      yield value
    }
  }

  toArray(): T[] {
    return [...this]
  }
}
