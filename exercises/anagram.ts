import { HashMapWithDefault } from '../data-structures'
import { sum, gt } from '../utils'

// Without sort
export function isAnagram(str1: string, str2: string): boolean {
  if (str1 === str2) return true

  let map = new HashMapWithDefault(0)

  for (let char of str1) {
    map.set(char, map.get(char) + 1)
  }

  for (let char of str2) {
    map.set(char, map.get(char) - 1)
  }

  return sum(Array.from(map.values()).filter(gt(0))) === 0
}
