// Java hashCode reimplementation
import { map } from '../iterator/map'
import { reduce } from '../iterator/reduce'

const toCharCode = (str: string) => str.charCodeAt(0)
const hashCodeReducer = (hash: number, charCode: number) =>
  ((hash << 5) - hash + charCode) << 0

export function hashCode(str: string): number {
  return reduce(map(str, toCharCode), hashCodeReducer, 0)
}
