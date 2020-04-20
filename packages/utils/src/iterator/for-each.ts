import { withCallback } from './with-callback'

export function forEach<T, This = undefined>(
  iterator: Iterable<T>,
  callback: (this: This, t: T, i: number) => unknown,
  thisArg?: This
): void {
  for (let _ of withCallback(iterator, callback, thisArg));
}
