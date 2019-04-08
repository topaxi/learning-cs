import { swap } from '../../utils/swap'
import { define } from './utils'

export const insertionsort = define((list, compare) => {
  for (let i = 0; i < list.length; i++) {
    let tmp = list[i]
    let j = i - 1

    for (; j >= 0 && compare(tmp, list[j]) < 0; j--) {
      swap(list, j, j + 1)
    }

    list[j + 1] = tmp
  }

  return list
})
