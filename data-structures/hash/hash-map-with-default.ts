import { HashMap } from './hash-map'

export class HashMapWithDefault<K extends string | number, T> extends HashMap<
  K,
  T
> {
  constructor(protected defaultValue: T, size?: number) {
    super(size)
  }

  get(key: K): T {
    if (this.has(key)) return super.get(key)!
    return this.defaultValue
  }
}
