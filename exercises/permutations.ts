export function permutations(
  nums: number[],
  added = new Set<number>(),
  list: number[] = [],
  out: number[][] = []
): number[][] {
  if (nums.length === list.length) return out.push(list.slice()), out

  for (let i = 0; i < nums.length; i++) {
    let n = nums[i]
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
