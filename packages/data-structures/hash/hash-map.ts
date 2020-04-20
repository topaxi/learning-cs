import { hashCode } from '@topaxi/lcs-utils/string/string-hash'
import { size } from '@topaxi/lcs-utils/object/size'
import { prop } from '@topaxi/lcs-utils/object/prop'
import { byKey } from '@topaxi/lcs-utils/filters/by'
import { map } from '@topaxi/lcs-utils/iterator/map'
import { flat } from '@topaxi/lcs-utils/iterator/flat'
import { LinkedList } from '../list/linked-list'
import { constant } from '@topaxi/lcs-utils/function/constant'
import { construct } from '@topaxi/lcs-utils/function/construct'
import { isEmpty } from '@topaxi/lcs-utils/object/is-empty'

const { abs } = Math
const { isFinite } = Number

class HashMapNode<K, T> {
  constructor(readonly key: K, public value: T) {}

  toEntry(): [K, T] {
    return [this.key, this.value]
  }
}

export type Hashable = string | number | { readonly id: string | number }

export class HashMap<K extends Hashable, T> implements Iterable<[K, T]> {
  protected slots = this.initializeSlots()
  private keyCache = this.initializeKeyCache()

  // eslint-disable-next-line
  static withDefault: typeof HashMapWithDefault

  get size(): number {
    return size(this.keyCache)
  }

  get empty(): boolean {
    return isEmpty(this.keyCache)
  }

  constructor(private readonly internalSize = 32) {}

  set(key: K, value: T): T {
    let keyHash = this.hash(key)
    this.keyCache[this.normalizeKey(key)] = keyHash

    let list = this.slots[keyHash]
    let node = list.find(byKey(key))

    if (node === null) {
      list.push(new HashMapNode(key, value))
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

    delete this.keyCache[this.normalizeKey(key)]

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

  keys(): IterableIterator<K> {
    return map(this.nodes(), prop('key'))
  }

  values(): IterableIterator<T> {
    return map(this.nodes(), prop('value'))
  }

  entries(): IterableIterator<[K, T]> {
    return map(this.nodes(), this.nodeToEntry)
  }

  private nodes(): IterableIterator<HashMapNode<K, T>> {
    return flat(this.slots)
  }

  [Symbol.iterator](): IterableIterator<[K, T]> {
    return this.entries()
  }

  protected hash(key: Hashable): number {
    key = this.normalizeKey(key)
    if (this.keyCache[key] !== undefined) return this.keyCache[key]

    let hash =
      typeof key === 'number' && isFinite(key) ? key : hashCode(String(key))

    return abs(hash) % this.slots.length
  }

  protected getNode(key: K): HashMapNode<K, T> | null {
    return this.getSlot(key).find(byKey(key))
  }

  protected getSlot(key: K): LinkedList<HashMapNode<K, T>> {
    return this.slots[this.hash(key)]
  }

  protected initializeSlots(): Array<LinkedList<HashMapNode<K, T>>> {
    return Array.from({ length: this.internalSize }, construct(LinkedList))
  }

  protected initializeKeyCache(): Record<string | number, number> {
    return {}
  }

  protected normalizeKey(key: Hashable): string | number {
    if (key == null) return String(key)

    return typeof key === 'object' ? key.id : key
  }

  private nodeToEntry(node: HashMapNode<K, T>): [K, T] {
    return node.toEntry()
  }
}

export class HashMapWithDefault<K extends Hashable, T> extends HashMap<K, T> {
  protected getDefaultValue: (key: K) => T

  constructor(defaultValue: T | ((key?: K) => T), size?: number) {
    super(size)

    this.getDefaultValue =
      typeof defaultValue === 'function'
        ? (defaultValue as (key: K) => T)
        : constant(defaultValue)
  }

  get(key: K): T {
    if (this.has(key)) return super.get(key)!
    return this.getDefaultValue(key)
  }
}

HashMap.withDefault = HashMapWithDefault
