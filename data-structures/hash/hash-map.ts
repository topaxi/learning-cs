import { LinkedList } from '../list'
import { hashCode, byKey } from '../../utils'

interface HashMapNode<K, T> {
  key: K
  value: T
}

export type Hashable = string | number | { readonly id: string | number }

export class HashMap<K extends Hashable, T> {
  protected slots = this.initializeSlots()
  private keyCache = this.initializeKeyCache()

  get size(): number {
    return Object.keys(this.keyCache).length
  }

  constructor(private readonly internalSize = 32) {}

  set(key: K, value: T): T {
    let keyHash = this.hash(key)
    this.keyCache[this.normalizeKey(key as Hashable)] = keyHash

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

    delete this.keyCache[this.normalizeKey(key as Hashable)]

    if (index !== -1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return list.deleteAt(index)!.value
    }

    return null
  }

  has(key: K): boolean {
    return Reflect.has(this.keyCache, this.normalizeKey(key))
  }

  clear(): void {
    this.slots = this.initializeSlots()
    this.keyCache = this.initializeKeyCache()
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
    for (let slot of this.slots) yield* slot
  }

  [Symbol.iterator](): IterableIterator<[K, T]> {
    return this.entries()
  }

  protected hash(key: Hashable): number {
    key = this.normalizeKey(key)
    if (this.keyCache[key] !== undefined) return this.keyCache[key]

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

  protected initializeSlots(): Array<LinkedList<HashMapNode<K, T>>> {
    return Array.from({ length: this.internalSize }, () => new LinkedList())
  }

  protected initializeKeyCache(): Record<string | number, number> {
    return ({} as unknown) as Record<string | number, number>
  }

  protected normalizeKey(key: Hashable): string | number {
    return typeof key === 'object' ? key.id : key
  }
}
