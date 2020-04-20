import { range } from '@topaxi/lcs-utils/range'
import { swap } from '@topaxi/lcs-utils/swap'
import { define } from './utils'

export const insertionsort = define((list, compare) => {
  for (let i of range(list.length)) {
    let tmp = list[i]
    let j = i - 1

    for (; j >= 0 && compare(tmp, list[j]) < 0; j--) {
      swap(list, j, j + 1)
    }

    list[j + 1] = tmp
  }

  return list
})
