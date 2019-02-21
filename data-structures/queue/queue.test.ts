import { Queue } from './queue'

describe('Queue<T>', () => {
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

  test('should throw when dequeue on empty queue', () => {
    let queue = new Queue()

    expect(queue.empty).toBe(true)
    expect(queue.length).toBe(0)
    expect(queue.peek()).toBeNull()
    expect(() => queue.dequeue()).toThrowError()
  })

  test('should serialize to an array', () => {
    let queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.toJSON()).toEqual([1, 2])
  })

  test('should stringify to comma separated string', () => {
    let queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.toString()).toBe('1,2')
  })
})
