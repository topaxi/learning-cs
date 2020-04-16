import { PriorityQueue } from './priority-queue'

describe('PriorityQueue', () => {
  test('should respect priorities when inserting', () => {
    const queue = new PriorityQueue<number>()

    expect(queue.enqueue(1, 1).peek()).toBe(1)
    expect(queue.enqueue(2, 2).peek()).toBe(1)
    expect(queue.enqueue(3, 0).peek()).toBe(3)
  })

  it('should accept any values', () => {
    const queue = new PriorityQueue<{ id: number }>()

    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const obj3 = { id: 3 }

    expect(queue.enqueue(obj1, 1).peek()).toBe(obj1)
    expect(queue.enqueue(obj2, 2).peek()).toBe(obj1)
    expect(queue.enqueue(obj3, 0).peek()).toBe(obj3)
  })

  it('should dequeue with respect to priorities', () => {
    const queue = new PriorityQueue<number>()

    queue.enqueue(1, 1).enqueue(2, 2).enqueue(3, 0).enqueue(4, 0)

    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(4)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
  })

  it('should be consumable as an iterator', () => {
    const queue = new PriorityQueue<number>()

    queue.enqueue(1, 1).enqueue(2, 2).enqueue(3, 0).enqueue(4, 0)

    expect(queue).toHaveLength(4)
    expect(Array.from(queue)).toEqual([3, 4, 1, 2])
    expect(queue.empty).toBe(true)
  })

  it('should be able to reprioritize items', () => {
    const queue = new PriorityQueue<number>()

    queue.enqueue(1, 1).enqueue(2, 2).enqueue(3, 0)

    queue.updatePriority(3, 3)

    expect(queue.peek()).toBe(1)

    queue.updatePriority(2, 0)

    expect(queue.peek()).toBe(2)
  })
})
