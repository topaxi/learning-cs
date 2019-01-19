import { range } from '../utils/range'
import { Stack } from '../data-structures/stack'
import { Queue } from '../data-structures/queue'

export function reverseQueue(
  queue: Queue<number>,
  n: number = queue.length
): void {
  let reversed = new Stack<number>()

  for (let i of range(n)) {
    reversed.push(queue.dequeue())
  }

  let rest = new Queue<number>()

  for (let i of range(queue.length)) {
    rest.enqueue(queue.dequeue())
  }

  queue.enqueue(...reversed.consume(), ...rest.consume())
}
