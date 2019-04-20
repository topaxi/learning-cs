import { range } from '../utils'
import { Stack, Queue } from '../data-structures'

export function reverseQueue(queue: Queue<number>, n = queue.length): void {
  let reversed = new Stack<number>()

  range(n).forEach(() => reversed.push(queue.dequeue()))

  let rest = new Queue<number>()

  range(queue.length).forEach(() => rest.enqueue(queue.dequeue()))

  queue.enqueue(...reversed.consume(), ...rest.consume())
}
