export function* map<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, t: T) => U,
  thisArg?: This
): IterableIterator<U> {
  for (let value of iterator) yield project.call(thisArg!, value)
}

export function foreach<T, This = undefined>(
  iterator: Iterable<T>,
  callback: (this: This, t: T) => unknown,
  thisArg?: This
): void {
  for (let value of iterator) callback.call(thisArg!, value)
}

export function find<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T) => boolean,
  thisArg?: This
): T | undefined {
  for (let value of iterator) if (predicate.call(thisArg!, value)) return value
}

export function last<T>(iterator: Iterable<T>): T | undefined {
  let last = undefined
  for (let value of iterator) last = value
  return last
}

export function includes<T>(iterator: Iterable<T>, value: T): boolean {
  for (let v of iterator) if (value === v) return true
  return false
}
