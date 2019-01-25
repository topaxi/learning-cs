import { LinkedList } from '../../data-structures'
import { partitionInline } from '../../utils/partition'

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function quickselect(
  list: number[],
  k: number,
  compare = (value: number, pivotElement: number) => value < pivotElement,
  left = 0,
  right = list.length - 1
): number {
  if (left === right) {
    return list[left]
  }

  let pivot = partitionInline(list, random(left, right), compare, left, right)

  if (k === pivot) {
    return list[k]
  } else if (k < pivot) {
    return quickselect(list, k, compare, left, pivot - 1)
  } else {
    return quickselect(list, k, compare, pivot + 1, right)
  }
}
