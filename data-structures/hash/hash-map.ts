import { LinkedList } from '../list'
import { hashCode } from '../../utils/string-hash'
import { byKey } from '../../utils/filters'
import { pluck } from '../../utils/pluck'

interface HashMapNode<T> {
  key: string | number
  value: T
}

export class HashMap<T> {
  protected readonly slots = Array.from(
    { length: this.internalSize },
    () => new LinkedList<HashMapNode<T>>()
  )
  private readonly keyMap: Record<string | number, number> = {}

  get size(): number {
    return this.keys().length
  }

  constructor(private readonly internalSize = 32) {}

  set(key: string | number, value: T): T {
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

  get(key: string | number): T | null {
    let node = this.getNode(key)

    return node === null ? null : node.value
  }

  delete(key: string | number): T | null {
    if (!this.has(key)) {
      return null
    }

    let list = this.getSlot(key)
    let index = list.findIndex(byKey(key))

    if (index !== -1) {
      return list.deleteAt(index)!.value
    }

    return null
  }

  has(key: string | number): boolean {
    return Reflect.has(this.keyMap, key)
  }

  keys(): Array<string | number> {
    return Object.keys(this.keyMap)
  }

  values(): T[] {
    return this.slots.flatMap(list => Array.from(list, pluck('value')))
  }

  entries(): [string | number, T][] {
    return this.slots.flatMap(list =>
      Array.from(list, node => [node.key, node.value])
    ) as [string | number, T][]
  }

  protected hash(key: string | number): number {
    if (this.keyMap[key] !== undefined) return this.keyMap[key]

    return Math.abs(hashCode(String(key))) % this.slots.length
  }

  protected getNode(key: string | number): HashMapNode<T> | null {
    return this.getSlot(key).find(byKey(key))
  }

  protected getSlot(key: string | number): LinkedList<HashMapNode<T>> {
    return this.slots[this.hash(key)]
  }
}
