import { Hashable } from '../data-structures/hash/hash-map'
import { HashSet } from '../data-structures/hash/hash-set'
import { length } from '../utils/iterator/length'

export function deduplicateInPlace<T extends Hashable>(array: T[]): T[] {
  let seen = new HashSet<T>()

  for (let i = 0; i < length(array); ) {
    if (seen.has(array[i])) {
      array.splice(i, 1)
    } else {
      seen.add(array[i++])
    }
  }

  return array
}
