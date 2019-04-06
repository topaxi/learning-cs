export function* map<T, U>(
  iterator: Iterable<T>,
  project: (t: T) => U
): IterableIterator<U> {
  for (let value of iterator) yield project(value)
}

export function* reverse<T>(iterator: Iterable<T>): IterableIterator<T> {
  for (let value of iterator) {
    yield* reverse(iterator)
    yield value
  }
}

export function foreach<T>(
  iterator: Iterable<T>,
  callback: (t: T) => unknown
): void {
  for (let value of iterator) callback(value)
}
