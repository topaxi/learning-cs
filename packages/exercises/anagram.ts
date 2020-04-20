import { sum } from '../utils/array/sum'
import { gt } from '../utils/filters/eq'
import { filter } from '../utils/iterator/filter'
import { HashMap } from '../data-structures/hash/hash-map'

// Without sort
export function isAnagram(str1: string, str2: string): boolean {
  if (str1 === str2) return true

  let map = new HashMap.withDefault(0)

  for (let char of str1) {
    map.set(char, map.get(char) + 1)
  }

  for (let char of str2) {
    map.set(char, map.get(char) - 1)
  }

  return sum(Array.from(filter(map.values(), gt(0)))) === 0
}
