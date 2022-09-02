import { zip } from '../iterator/zip'
import { keys } from './keys'
import { values } from './values'

export type Entry<T, K extends keyof T = keyof T> = [K, T[K]]

export function entries<T extends object>(obj: T): IterableIterator<Entry<T>> {
  return zip(keys(obj), values(obj))
}
