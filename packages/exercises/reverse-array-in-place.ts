import { range } from '../utils/range'
import { swap } from '../utils/swap'

const { floor } = Math

export function reverseArrayInPlace<T>(array: T[]): T[] {
  for (let i of range(floor(array.length / 2))) {
    swap(array, i, array.length - i - 1)
  }

  return array
}
