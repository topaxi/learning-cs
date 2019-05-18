export function isIterable<T>(iterable: unknown): iterable is Iterable<T> {
  return (
    typeof iterable === 'object' &&
    iterable !== null &&
    Reflect.has(iterable, Symbol.iterator)
  )
}
