import { HashMap } from './hash-map'

export class HashMapWithDefault<T> extends HashMap<T> {
  constructor(protected defaultValue: T, size?: number) {
    super(size)
  }

  get(key: string | number): T {
    let node = this.getNode(key)

    return node === null ? this.defaultValue : node.value
  }
}
