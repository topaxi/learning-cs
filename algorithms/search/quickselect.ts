import { LinkedList } from '../../data-structures'
import { partitionInline } from '../../utils/partition'

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function quickselect(
  list: number[],
  k: number,
  leftIndex = 0,
  rightIndex = list.length - 1
): number {
  if (leftIndex === rightIndex) {
    return list[leftIndex]
  }

  let pivot = partitionInline(
    list,
    random(leftIndex, rightIndex),
    (v, pivotElement) => v < pivotElement,
    leftIndex,
    rightIndex
  )

  if (k === pivot) {
    return list[k]
  } else if (k < pivot) {
    return quickselect(list, k, leftIndex, pivot - 1)
  } else {
    return quickselect(list, k, pivot + 1, rightIndex)
  }
}
