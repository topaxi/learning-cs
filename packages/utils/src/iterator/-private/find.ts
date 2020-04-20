import { withCallback, WithCallbackEntry } from '../with-callback'

export function _find<T, U, This = undefined>(
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
