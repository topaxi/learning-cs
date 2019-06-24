import { hasOwnProperty } from './has-own-property'

export type Entry<T, K extends keyof T = keyof T> = [K, T[K]]

export function* entries<T extends object>(
  obj: T
): IterableIterator<Entry<T>> {
  for (let key in obj) {
    if (hasOwnProperty(obj, key)) {
      yield [key, obj[key]]
    }
  }
}
