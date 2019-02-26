import { HashMap } from './hash-map'

export class HashSet<T extends string | number> {
  private _hash = new HashMap<T, T>()

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
    let set = new HashSet<T>()

    iterables.unshift(this)

    for (let i = 0; i < iterables.length; i++) {
      for (let value of iterables[i]) {
        set.add(value)
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
