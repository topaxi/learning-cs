import { Queue } from './queue-using-stacks'

describe('Queue<T> using stacks', () => {
  test('should enqueue/dequeue items', () => {
    let queue = new Queue()

    queue.enqueue(1, 2, 3)

    expect(queue.peek()).toBe(1)
    expect(queue.dequeue()).toBe(1)
    expect(queue.peek()).toBe(2)
    expect(queue.dequeue()).toBe(2)
    expect(queue.peek()).toBe(3)
    expect(queue.dequeue()).toBe(3)
  })
})
