import { hasOwnProperty } from './has-own-property'

export function* keys<T extends object>(obj: T): IterableIterator<keyof T> {
  for (let key in obj) {
    if (hasOwnProperty(obj, key)) {
      yield key
    }
  }
}
