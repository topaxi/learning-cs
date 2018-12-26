export function defaultCompare(a: any, b: any): number {
  return b - a
}

export function isort<T>(
  list: T[],
  compare: (a: T, b: T) => number = defaultCompare,
): T[] {
  for (let i = 0; i < list.length; i++) {
    let tmp = list[i]
    let j = i - 1

    for (; j >= 0 && compare(tmp, list[j]) > 0; j--) {
      list[j + 1] = list[j]
    }

    list[j + 1] = tmp
  }

  return list
}
