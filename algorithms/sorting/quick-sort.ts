import { define } from './utils'
import { lastIndex } from '../../utils/array/last-index'
import { partition } from '../../utils/array/partition'
import { random } from '../../utils/random'

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
