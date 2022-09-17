/**
 * Fully consumes an iterable and returns its last yielded value.
 */
export function consume<T>(iterator: Iterable<T>): T | undefined {
  let lastValue: T | undefined

  for (let value of iterator) {
    lastValue = value
  }

  return lastValue
}
