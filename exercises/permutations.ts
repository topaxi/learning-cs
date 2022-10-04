import { HashSet } from '../data-structures/hash/hash-set'
import { length } from '../utils/iterator/length'

export function permutations(
  nums: number[],
  added = new HashSet<number>(),
  list: number[] = [],
  out: number[][] = []
): number[][] {
  if (length(nums) === length(list)) return out.push(list.slice()), out

  for (let n of nums) {
    if (!added.has(n)) {
      added.add(n)
      list.push(n)
      permutations(nums, added, list, out)
      list.pop()
      added.delete(n)
    }
  }

  return out
}
