import { HashMap, Hashable, HashMapWithDefault } from './hash-map'
import { HashSet } from './hash-set'
import { flat } from '../../utils/iterator/flat'
import { flatMap } from '../../utils/iterator/flat-map'
import { zip } from '../../utils/iterator/zip'
import { infinite } from '../../utils/iterator/infinite'
import { length } from '../../utils/iterator/length'

export class MultiHashMap<K extends Hashable, V extends Hashable> {
  private map: HashMapWithDefault<K, HashSet<V>>

  constructor(internalSize = 24) {
    this.map = new HashMap.withDefault<K, HashSet<V>>(
      () => new HashSet(Math.floor(internalSize / 2)),
      internalSize
    )
  }

  get size(): number {
    return length(this.map)
  }

  get empty(): boolean {
    return this.map.empty
  }

  get(key: K): V[] {
    return this.map.get(key)!.toArray()
  }

  has(key: K): boolean {
    return this.map.has(key)
  }

  set(key: K, value: V): this {
    this.map.set(key, this.map.get(key).add(value))

    return this
  }

  delete(key: K, value: V): boolean {
    if (!this.map.has(key)) return false

    let set = this.map.get(key)!

    if (!set.has(value)) return false

    set.delete(value)

    if (set.empty) this.map.delete(key)

    return true
  }

  deleteAll(key: K): V[] {
    if (!this.map.has(key)) return []

    return this.map.delete(key)!.toArray()
  }

  clear(): void {
    this.map.clear()
  }

  keys(): IterableIterator<K> {
    return this.map.keys()
  }

  values(): IterableIterator<V> {
    return flat(this.map.values())
  }

  entries(): IterableIterator<[K, V]> {
    return flatMap(this.map, this.entriesMapper)
  }

  private entriesMapper([key, set]: [K, HashSet<V>]): IterableIterator<
    [K, V]
  > {
    return zip(infinite(key), set)
  }
}
