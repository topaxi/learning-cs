import { head } from '../../utils/array/head'
import { define } from './utils'

export const mergesort = define(function m(list, compare): typeof list {
  if (list.length < 2) return list

  let half = Math.floor(list.length / 2)
  let left = m(list.slice(0, half), compare)
  let right = m(list.slice(half), compare)

  return merge(left, right, compare)
})

function merge<T>(
  left: T[],
  right: T[],
  compare: (a: T, b: T) => number
): T[] {
  let sorted: T[] = []

  while (left.length !== 0 && right.length !== 0) {
    sorted.push(
      compare(head(left)!, head(right)!) <= 0 ? left.shift()! : right.shift()!
    )
  }

  return sorted.concat(left, right)
}
