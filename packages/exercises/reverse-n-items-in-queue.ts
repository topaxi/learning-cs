import { Queue } from '../data-structures/queue/queue'
import { Stack } from '../data-structures/stack/stack'
import { take } from '../utils/iterator/take'

export function reverseQueue(queue: Queue<number>, n = queue.length): void {
  queue.enqueue(...Stack.from(take(queue, n)), ...Queue.from(queue))
}
