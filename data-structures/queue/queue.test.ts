import { expect } from 'chai'
import { Queue } from './queue'

describe('Queue<T>', () => {
  it('should enqueue/dequeue items', () => {
    let queue = new Queue()

    queue.enqueue(1, 2, 3)

    expect(queue.peek()).to.equal(1)
    expect(queue.dequeue()).to.equal(1)
    expect(queue.peek()).to.equal(2)
    expect(queue.dequeue()).to.equal(2)
    expect(queue.peek()).to.equal(3)
    expect(queue.dequeue()).to.equal(3)
  })
})
