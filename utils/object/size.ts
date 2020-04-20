import { reduce } from '../iterator/reduce'
import { map } from '../iterator/map'
import { constant } from '../function/constant'
import { add } from '../operators'
import { keys } from './keys'

export function size(obj: object): number {
  return reduce(map(keys(obj), constant(1)), add, 0)
}
