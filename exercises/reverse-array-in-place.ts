import { swap } from '../utils/swap'

export function reverseArrayInPlace<T>(array: T[]): T[] {
  for (let i = 0, l = Math.floor(array.length / 2); i < l; i++) {
    swap(array, i, array.length - i - 1)
  }

  return array
}
