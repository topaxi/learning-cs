import { define } from './utils'
import { lastIndex } from '@topaxi/lcs-utils/array/last-index'
import { partition } from '@topaxi/lcs-utils/array/partition'
import { random } from '@topaxi/lcs-utils/random'

export const quicksort = define(function q(list, compare): typeof list {
  if (list.length < 2) return list

  let pivot = random(0, lastIndex(list))
  let pivotElement = list[pivot]

  let [greater, smaller] = partition(
    [...list.slice(0, pivot), ...list.slice(pivot + 1)],
    v => compare(pivotElement, v) < 0
  )

  return [...q(smaller, compare), pivotElement, ...q(greater, compare)]
})
