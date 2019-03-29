import { HashMapWithDefault } from '../data-structures'
import { add, gt } from '../utils'

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

  return (
    Array.from(map.values())
      .filter(gt(0))
      .reduce(add, 0) === 0
  )
}
