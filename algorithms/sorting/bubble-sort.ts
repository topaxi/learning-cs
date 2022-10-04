import { length } from '../../utils/iterator/length'
import { range } from '../../utils/range'
import { swap } from '../../utils/swap'
import { define } from './utils'

export const bubbleSort = define((list, compare) => {
  let n = length(list)
  let swapped

  do {
    swapped = false

    for (let i of range(1, n)) {
      if (compare(list[i - 1], list[i]) > 0) {
        swap(list, i - 1, i)
        swapped = true
      }
    }

    n = n - 1
  } while (swapped)

  return list
})

export const bubbleSortOptimized = define((list, compare) => {
  let n = length(list)

  do {
    let nextn = 0

    for (let i of range(1, n)) {
      if (compare(list[i - 1], list[i]) > 0) {
        swap(list, i - 1, i)
        nextn = i
      }
    }

    n = nextn
  } while (n !== 0)

  return list
})
