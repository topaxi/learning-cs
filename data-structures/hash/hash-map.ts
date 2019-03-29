import { LinkedList } from '../list'
import { hashCode, byKey } from '../../utils'

interface HashMapNode<K, T> {
  key: K
  value: T
}

export class HashMap<K extends string | number, T> {
  protected slots = Array.from(
    { length: this.internalSize },
    () => new LinkedList<HashMapNode<K, T>>()
  )
  private keyMap: Record<K, number> = {} as any

  get size(): number {
    return Object.keys(this.keyMap).length
  }

  constructor(private readonly internalSize = 32) {}

  set(key: K, value: T): T {
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

  get(key: K): T | null {
    let node = this.getNode(key)

    return node === null ? null : node.value
  }

  delete(key: K): T | null {
    if (!this.has(key)) {
      return null
    }

    let list = this.getSlot(key)
    let index = list.findIndex(byKey(key))

    delete this.keyMap[key]

    if (index !== -1) {
      return list.deleteAt(index)!.value
    }

    return null
  }

  has(key: string | number): boolean {
    return Reflect.has(this.keyMap, key)
  }

  clear(): void {
    this.slots = this.slots.map(() => new LinkedList())
    this.keyMap = {} as any
  }

  *keys(): IterableIterator<K> {
    for (let { key } of this.nodes()) yield key
  }

  *values(): IterableIterator<T> {
    for (let { value } of this.nodes()) yield value
  }

  *entries(): IterableIterator<[K, T]> {
    for (let { key, value } of this.nodes()) yield [key, value]
  }

  private *nodes(): IterableIterator<HashMapNode<K, T>> {
    for (let i = 0; i < this.slots.length; i++) {
      yield* this.slots[i]
    }
  }

  [Symbol.iterator](): IterableIterator<[K, T]> {
    return this.entries()
  }

  protected hash(key: K): number {
    if (this.keyMap[key] !== undefined) return this.keyMap[key]

    let hash =
      typeof key === 'number' && Number.isFinite(key)
        ? key
        : hashCode(String(key))

    return Math.abs(hash) % this.slots.length
  }

  protected getNode(key: K): HashMapNode<K, T> | null {
    return this.getSlot(key).find(byKey(key))
  }

  protected getSlot(key: K): LinkedList<HashMapNode<K, T>> {
    return this.slots[this.hash(key)]
  }
}
