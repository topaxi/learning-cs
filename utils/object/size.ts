import { length } from '../iterator/length'
import { keys } from './keys'

export function size(obj: object): number {
  return length(keys(obj))
}
