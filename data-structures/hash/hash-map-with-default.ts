import { HashMap, Hashable } from './hash-map'

export class HashMapWithDefault<K extends Hashable, T> extends HashMap<K, T> {
  constructor(protected defaultValue: T, size?: number) {
    super(size)
  }

  get(key: K): T {
    if (this.has(key)) return super.get(key)!
    return this.defaultValue
  }
}
