export function* map<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, t: T, i: number) => U,
  thisArg?: This
): IterableIterator<U> {
  let i = 0
  for (let value of iterator) yield project.call(thisArg!, value, i++)
}

export function filter<T, S extends T, This = undefined>(
  iterator: Iterable<T>,
  filter: (this: This, value: T, index: number) => value is S,
  thisArg?: This
): IterableIterator<S>
export function filter<T, This = undefined>(
  iterator: Iterable<T>,
  filter: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T>
export function* filter<T, This = undefined>(
  iterator: Iterable<T>,
  filter: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T> {
  let i = 0
  for (let value of iterator)
    if (filter.call(thisArg!, value, i++)) yield value
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

export function* reverse<T>(iterator: Iterable<T>): IterableIterator<T> {
  for (let value of iterator) {
    yield* reverse(iterator)
    yield value
  }
}

export function flat<T>(
  iterator: Iterable<Iterable<Iterable<Iterable<T>>>>,
  depth: 3
): IterableIterator<T>
export function flat<T>(
  iterator: Iterable<Iterable<Iterable<T>>>,
  depth: 2
): IterableIterator<T>
export function flat<T>(
  iterator: Iterable<Iterable<T>>,
  depth?: 1
): IterableIterator<T>
export function flat<T>(iterator: Iterable<T>, depth: 0): IterableIterator<T>
export function flat(
  iterator: Iterable<unknown>,
  depth?: number
): IterableIterator<unknown>
export function* flat(
  iterator: Iterable<unknown>,
  depth = 1
): IterableIterator<unknown> {
  if (depth < 0) return yield iterator

  for (let value of iterator) {
    if (isIterable(value)) {
      yield* flat(value, depth - 1)
    } else {
      yield value
    }
  }
}

export function isIterable<T>(iterable: unknown): iterable is Iterable<T> {
  return (
    typeof iterable === 'object' &&
    iterable != null &&
    Reflect.has(iterable, Symbol.iterator)
  )
}

export function* tap<T, This = undefined>(
  iterable: Iterable<T>,
  fn: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T> {
  let i = 0
  for (let value of iterable) {
    fn.call(thisArg!, value, i++)
    yield value
  }
}
