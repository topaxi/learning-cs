import { HashMap } from './hash-map'

export class HashSet<T extends string | number> {
  private _hash = new HashMap<T, true>()

  has(value: T): boolean {
    return this._hash.has(value)
  }

  add(value: T): this {
    this._hash.set(value, true)
    return this
  }

  delete(value: T): this {
    this._hash.delete(value)
    return this
  }
}
