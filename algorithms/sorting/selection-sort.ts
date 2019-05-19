import { range } from '../../utils/range'
import { swap } from '../../utils/swap'
import { define } from './utils'

export const selectionsort = define((list, compare) => {
  for (let i of range(list.length - 1)) {
    let min = i

    for (let j of range(i + 1, list.length)) {
      if (compare(list[j], list[min]) < 0) {
        min = j
      }
    }

    if (min !== i) {
      swap(list, i, min)
    }
  }

  return list
})
