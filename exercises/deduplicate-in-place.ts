import { HashSet } from '../data-structures/hash/hash-set'

export function deduplicateInPlace<T extends string | number>(
  array: T[]
): T[] {
  let seen = new HashSet<T>()

  for (let i = 0; i < array.length; ) {
    if (seen.has(array[i])) {
      array.splice(i, 1)
    } else {
      seen.add(array[i++])
    }
  }

  return array
}
