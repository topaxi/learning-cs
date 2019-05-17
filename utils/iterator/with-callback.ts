import { identity } from '../function/identity'
import { entries } from './entries'

export interface WithCallbackEntry<T, U> {
  result: U
  value: T
  index: number
}

export function* withCallback<
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
