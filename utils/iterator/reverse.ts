export function* reverse<T>(iterator: Iterable<T>): IterableIterator<T> {
  for (let value of iterator) {
    yield* reverse(iterator)
    yield value
  }
}
