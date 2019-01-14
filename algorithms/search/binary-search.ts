export function binarySearch<T = number>(
  list: T[],
  element: T,
  compare: (a: T, b: T) => number = ((a: number, b: number) => a - b) as any
): number {
  let start = 0
  let end = list.length - 1

  while (start <= end) {
    let i = start + Math.floor((end - start) / 2)

    if (compare(list[i], element) === 0) {
      return i
    }

    if (compare(list[i], element) < 0) {
      start = i + 1
    } else {
      end = i - 1
    }
  }

  return -1
}
