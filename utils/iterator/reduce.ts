import { assert } from '../assert'

export interface Reducer<A = unknown, T = unknown> {
  (accumulator: A, value: T, index: number): A
}

export function reduce<T>(iterable: Iterable<T>, callback: Reducer<T, T>): T
export function reduce<T, A>(
  iterable: Iterable<T>,
  callback: Reducer<A, T>,
  initialValue: A
): A
export function reduce(
  iterable: Iterable<unknown>,
  callback: Reducer,
  initialValue?: unknown
): unknown {
  let hasInitialValue = Number(arguments.length === 3)
  let accumulator = initialValue
  let iterator = iterable[Symbol.iterator]()

  if (hasInitialValue === 0) {
    const n = iterator.next()

    assert(
      !n.done,
      new TypeError('Reduce of empty iterable without initial value')
    )

    accumulator = n.value
  }

  for (
    let i = hasInitialValue, n = iterator.next();
    !n.done;
    n = iterator.next()
  ) {
    accumulator = callback(accumulator, n.value, i++)
  }

  if (iterator.return !== undefined) {
    iterator.return()
  }

  return accumulator
}
