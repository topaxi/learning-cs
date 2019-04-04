import { HashMapWithDefault } from '../data-structures'
import { head, eq, prop, c } from '../utils'

export function commonArrayValues<T extends number | string>(
  array1: T[],
  array2: T[],
  ...arrays: T[][]
): T[]
export function commonArrayValues<T extends number | string>(
  ...arrays: T[][]
): T[] {
  let map = new HashMapWithDefault<T, number>(0)

  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      map.set(arrays[i][j], map.get(arrays[i][j]) + 1)
    }
  }

  return Array.from(map.entries())
    .filter(c<[T, number], boolean, number>(eq(arrays.length), prop(1)))
    .map(e => head(e))
}
