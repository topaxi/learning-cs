export function defaultCompare(a: any, b: any): number {
  return a - b
}

export function mergesort<T>(
  list: readonly T[],
  compare: (a: T, b: T) => number = defaultCompare
): T[] {
  if (list.length < 2) return [...list]

  let half = Math.floor(list.length / 2)
  let left = mergesort(list.slice(0, half), compare)
  let right = mergesort(list.slice(half), compare)

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
      compare(left[0], right[0]) <= 0 ? left.shift()! : right.shift()!
    )
  }

  return sorted.concat(left, right)
}
