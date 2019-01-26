export function deduplicateInPlace<T>(array: T[]): T[] {
  let seen = new Set<T>()

  for (let i = 0; i < array.length; ) {
    if (seen.has(array[i])) {
      array.splice(i, 1)
    } else {
      seen.add(array[i++])
    }
  }

  return array
}
