import { LinkedList } from '../list'
import { hashCode } from '../../utils/string-hash'
import { byKey } from '../../utils/filters'
import { pluck } from '../../utils/pluck'

export class HashMap<T> {
  private readonly slots = Array.from(
    { length: this.size },
    () => new LinkedList<{ key: string; value: T }>()
  )
  private readonly keyMap: Record<string, number> = {}

  constructor(private readonly size = 32) {}

  private hash(key: string): number {
    return hashCode(key) % this.slots.length
  }

  set(key: string, value: T): T {
    let keyHash = this.hash(key)
    this.keyMap[key] = keyHash

    let list = this.slots[keyHash]
    let node = list.find(byKey(key))

    if (node === null) {
      list.push({ key, value })
    } else {
      node.value = value
    }

    return value
  }

  get(key: string): T | null {
    let node = this.slots[this.hash(key)].find(byKey(key))

    return node === null ? null : node.value
  }

  delete(key: string): T | null {
    if (!this.has(key)) {
      return null
    }

    let keyHash = this.hash(key)
    let index = this.slots[keyHash].findIndex(byKey(key))

    if (index !== -1) {
      return this.slots[keyHash].splice(index, 1).head()!.value
    }

    return null
  }

  has(key: string): boolean {
    return Reflect.has(this.keyMap, key)
  }

  keys(): string[] {
    return Object.keys(this.keyMap)
  }

  values(): T[] {
    return this.slots.flatMap(list => Array.from(list, pluck('value')))
  }
}
