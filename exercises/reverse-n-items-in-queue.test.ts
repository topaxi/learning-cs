import { expect } from 'chai'
import { Queue } from '../data-structures/queue'
import { reverseQueue } from './reverse-n-items-in-queue'

describe('Reverse n items in queue', () => {
  it('should reverse items', () => {
    let queue = new Queue<number>()

    queue.enqueue(1, 2, 3, 4, 5)

    expect(queue.toString()).to.equal('1,2,3,4,5')

    reverseQueue(queue, 3)

    expect(queue.peek()).to.equal(3)
    expect(queue.toString()).to.equal('3,2,1,4,5')
  })
})
