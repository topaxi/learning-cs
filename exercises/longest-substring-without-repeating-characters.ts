import { HashMap } from '../data-structures/hash/hash-map'
import { max } from '../utils/iterator/minmax'

export function lengthOfLongestSubstring(s: string): number {
  if (s === '') return 0
  if (s.length === 1) return 1

  let map = new HashMap.withDefault(0)
  let length = 0

  for (let i = 0, w = 0; i < s.length; i++) {
    let nw = map.get(s[i])

    if (nw > w) {
      w = nw
    }

    length = max([length, i - w + 1])
    map.set(s[i], i + 1)
  }

  return length
}
