import { map } from '../iterator/map'
import { get } from './get'
import { keys } from './keys'

export function values<T extends object>(
  obj: T
): IterableIterator<T[keyof T]> {
  return map(keys(obj), get(obj))
}
