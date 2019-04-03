export function* map<T, U>(
  iterator: Iterable<T>,
  project: (t: T) => U
): IterableIterator<U> {
  for (let value of iterator) yield project(value)
}

export function foreach<T>(
  iterator: Iterable<T>,
  callback: (t: T) => unknown
): void {
  for (let value of iterator) callback(value)
}

export function find<T>(
  iterator: Iterable<T>,
  predicate: (t: T) => boolean
): T | undefined {
  for (let value of iterator) if (predicate(value)) return value
}

export function last<T>(iterator: Iterable<T>): T | undefined {
  let last = undefined
  for (let value of iterator) last = value
  return last
}
