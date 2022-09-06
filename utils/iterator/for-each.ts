import { withCallback } from './with-callback'
import { consume } from './consume'

export function forEach<T, This = undefined>(
  iterator: Iterable<T>,
  callback: (this: This, t: T, i: number) => unknown,
  thisArg?: This
): void {
  consume(withCallback(iterator, callback, thisArg))
}
