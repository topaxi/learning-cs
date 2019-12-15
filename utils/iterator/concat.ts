export function* concat<T>(...iterators: Iterable<T>[]): IterableIterator<T> {
  for (let i = 0; i < iterators.length; i++) {
    yield* iterators[i]
  }
}
