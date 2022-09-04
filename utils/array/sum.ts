import { sum as sumIterable } from '../iterator/sum'

export function sum(array: readonly number[]): number {
  return sumIterable(array)
}
