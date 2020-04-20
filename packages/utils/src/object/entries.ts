import { keys } from './keys'

export type Entry<T, K extends keyof T = keyof T> = [K, T[K]]

export function* entries<T extends object>(
  obj: T
): IterableIterator<Entry<T>> {
  for (let key of keys(obj)) {
    yield [key, obj[key]]
  }
}
