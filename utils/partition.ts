export function partition<T>(
  array: ReadonlyArray<T>,
  fn: (t: T, i: number, a: ReadonlyArray<T>) => boolean,
): [T[], T[]] {
  let a: T[] = []
  let b: T[] = []

  array.forEach((t, i, arr) => {
    ;(fn(array[i], i, array) ? a : b).push(array[i])
  })

  return [a, b]
}
