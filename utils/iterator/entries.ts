export function* entries<T>(
  iterator: Iterable<T>
): IterableIterator<[number, T]> {
  let i = 0
  for (let value of iterator) yield [i++, value]
}
