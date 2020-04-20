import { HashMap } from '../data-structures/hash/hash-map'
import { Hashable } from '../data-structures/hash/hash-map'
import { c } from '../utils/function/compose'
import { prop } from '../utils/object/prop'
import { head } from '../utils/array/head'
import { eq } from '../utils/filters/eq'
import { range } from '../utils/range'
import { filter } from '../utils/iterator/filter'

export function commonArrayValues<T extends Hashable>(
  array1: T[],
  array2: T[],
  ...arrays: T[][]
): T[]
export function commonArrayValues<T extends Hashable>(...arrays: T[][]): T[] {
  let map = new HashMap.withDefault<T, number>(0)

  for (let i of range(arrays.length)) {
    for (let j of range(arrays[i].length)) {
      map.set(arrays[i][j], map.get(arrays[i][j]) + 1)
    }
  }

  return Array.from<[T, number], T>(
    filter(map, c<[T, number], boolean, number>(eq(arrays.length), prop(1))),
    head
  )
}
