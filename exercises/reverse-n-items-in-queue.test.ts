import { Queue } from '../data-structures'
import { reverseQueue } from './reverse-n-items-in-queue'

describe('Reverse n items in queue', () => {
  test('should reverse items', () => {
    let queue = new Queue<number>()

    queue.enqueue(1, 2, 3, 4, 5)

    expect(queue.toString()).toBe('1,2,3,4,5')

    reverseQueue(queue, 3)

    expect(queue.peek()).toBe(3)
    expect(queue.toString()).toBe('3,2,1,4,5')
  })
})
