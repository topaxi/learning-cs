import { eq } from './filters/eq'
import { not } from './function/not'
import { identity } from './function/identity'
import { returnTrue } from './function/constant'
import { prop } from './object/prop'
import { lastIndex } from './array/last-index'

export function* entries<T>(
  iterator: Iterable<T>
): IterableIterator<[number, T]> {
  let i = 0
  for (let value of iterator) yield [i++, value]
}

interface WithCallbackEntry<T, U> {
  result: U
  value: T
  index: number
}

function* withCallback<
  T,
  U,
  V = { result: U; value: T; index: number },
  This = undefined
>(
  iterator: Iterable<T>,
  callback: (this: This, value: T, index: number) => U,
  thisArg?: This,
  project: (result: WithCallbackEntry<T, U>) => V = identity as any
): IterableIterator<V> {
  for (let [index, value] of entries(iterator))
    yield project({
      result: callback.call(thisArg!, value, index),
      value,
      index
    })
}

export function map<T, U, This = undefined>(
  iterator: Iterable<T>,
  project: (this: This, t: T, i: number) => U,
  thisArg?: This
): IterableIterator<U> {
  return withCallback(iterator, project, thisArg, prop('result'))
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
  for (let { result, value } of withCallback(iterator, filter, thisArg))
    if (result) yield value
}

export function forEach<T, This = undefined>(
  iterator: Iterable<T>,
  callback: (this: This, t: T, i: number) => unknown,
  thisArg?: This
): void {
  for (let _ of withCallback(iterator, callback, thisArg));
}

function _find<T, U, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  onResult: (entry: WithCallbackEntry<T, boolean>) => U,
  defaultValue: U,
  thisArg?: This
): U {
  for (let entry of withCallback(iterator, predicate, thisArg))
    if (entry.result) return onResult(entry)
  return defaultValue
}

export function find<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): T | undefined {
  return _find(iterator, predicate, prop('value'), undefined, thisArg)
}

export function last<T>(iterator: Iterable<T>): T | undefined {
  if (Array.isArray(iterator) || typeof iterator === 'string') {
    return iterator[lastIndex(iterator)]
  }

  let last = undefined
  for (let value of iterator) last = value
  return last
}

export function some<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): boolean {
  return _find(iterator, predicate, returnTrue, false, thisArg)
}

export function every<T, This = undefined>(
  iterator: Iterable<T>,
  predicate: (this: This, t: T, i: number) => boolean,
  thisArg?: This
): boolean {
  return !some(iterator, not(predicate), thisArg)
}

export function includes<T>(iterator: Iterable<T>, value: T): boolean {
  return some(iterator, eq(value))
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

export function tap<T, This = undefined>(
  iterable: Iterable<T>,
  fn: (this: This, value: T, index: number) => unknown,
  thisArg?: This
): IterableIterator<T> {
  return withCallback(iterable, fn, thisArg, prop('value'))
}
