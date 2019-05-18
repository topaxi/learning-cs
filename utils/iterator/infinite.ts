export function* infinite<T>(value: T): IterableIterator<T> {
  for (;;) yield value
}
