import { range } from '../utils'
import { Stack, Queue } from '../data-structures'

export function reverseQueue(
  queue: Queue<number>,
  n: number = queue.length
): void {
  let reversed = new Stack<number>()

  for (let _i of range(n)) {
    reversed.push(queue.dequeue())
  }

  let rest = new Queue<number>()

  for (let _i of range(queue.length)) {
    rest.enqueue(queue.dequeue())
  }

  queue.enqueue(...reversed.consume(), ...rest.consume())
}
