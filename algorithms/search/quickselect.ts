import { partitionInline, random, lastIndex } from '../../utils'

export function quickselect(
  list: number[],
  k: number,
  compare = (value: number, pivotElement: number) => value < pivotElement,
  left = 0,
  right = lastIndex(list)
): number {
  if (left === right) {
    return list[left]
  }

  let pivot = partitionInline(list, random(left, right), compare, left, right)
  let length = pivot - left + 1

  if (k === length) {
    return list[pivot]
  } else if (k < length) {
    return quickselect(list, k, compare, left, pivot - 1)
  } else {
    return quickselect(list, k - length, compare, pivot + 1, right)
  }
}
