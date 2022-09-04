import { keys } from './keys'
import { every } from '../iterator/every'
import { returnFalse } from '../function/constant'

export function isEmpty(obj: object): obj is Record<never, never> {
  return every(keys(obj), returnFalse)
}
