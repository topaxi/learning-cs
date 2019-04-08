import { partition, random } from '../../utils'
import { define } from './utils'

export const quicksort = define(function q(list, compare): typeof list {
  if (list.length < 2) return list

  let pivot = random(0, list.length - 1)
  let pivotElement = list[pivot]

  let [greater, smaller] = partition(
    [...list.slice(0, pivot), ...list.slice(pivot + 1)],
    v => compare(pivotElement, v) < 0
  )

  return [...q(smaller, compare), pivotElement, ...q(greater, compare)]
})
