export function defaultCompare(a: any, b: any): number {
  return b - a
}

export function msort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  if (list.length < 2) return [...list]
  if (list.length === 2) {
    return compare(list[0], list[1]) >= 0 ? [...list] : [list[1], list[0]]
  }

  let half = Math.floor(list.length / 2)
  let left = msort(list.slice(0, half), compare)
  let right = msort(list.slice(half), compare)

  return merge(left, right, compare)
}

function merge<T>(
  left: T[],
  right: T[],
  compare: (a: T, b: T) => number
): T[] {
  let sorted: T[] = []

  while (left.length !== 0 && right.length !== 0) {
    sorted.push(
      compare(left[0], right[0]) >= 0 ? left.shift()! : right.shift()!
    )
  }

  return sorted.concat(left, right)
}
