import { add } from '../operators'

export function sum(array: readonly number[]): number {
  return array.reduce(add, 0)
}
