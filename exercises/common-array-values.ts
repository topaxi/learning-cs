import { Hashable, HashMapWithDefault } from '../data-structures'
import { range, head, eq, prop, c } from '../utils'

export function commonArrayValues<T extends Hashable>(
  array1: T[],
  array2: T[],
  ...arrays: T[][]
): T[]
export function commonArrayValues<T extends Hashable>(...arrays: T[][]): T[] {
  let map = new HashMapWithDefault<T, number>(0)

  for (let i of range(arrays.length)) {
    for (let j of range(arrays[i].length)) {
      map.set(arrays[i][j], map.get(arrays[i][j]) + 1)
    }
  }

  return Array.from(map.entries())
    .filter(c<[T, number], boolean, number>(eq(arrays.length), prop(1)))
    .map(e => head(e))
}
