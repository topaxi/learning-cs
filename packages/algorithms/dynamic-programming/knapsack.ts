import { mY } from '../../utils/function/y'
import { head } from '../../utils/array/head'
import { tail } from '../../utils/array/tail'

const { max } = Math

export interface Item {
  value: number
  size: number
}

export const knapsack = mY(
  knapsack => (list: readonly Item[], space: number) => {
    // Base case, empty list, we stole everything!
    if (list.length === 0) return 0

    // Base case, no more space, better run!
    if (space === 0) return 0

    // Recurrence, item is too big, I ain't carrying this!
    if (head(list)!.size > space) return knapsack(tail(list), space)

    // Recurrence, do we get more value if we take it or not?
    return max(
      knapsack(tail(list), space),
      head(list)!.value + knapsack(tail(list), space - head(list)!.size)
    )
  }
)
