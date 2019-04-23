import { range } from '../utils/range'
import { swap } from '../utils/swap'

export function reverseArrayInPlace<T>(array: T[]): T[] {
  for (let i of range(Math.floor(array.length / 2))) {
    swap(array, i, array.length - i - 1)
  }

  return array
}
