import { expect } from 'chai'
import { MinHeap } from './min-heap'

describe('MinHeap', () => {
  it('should create empty heap', () => {
    let heap = new MinHeap<number>((a, b) => a - b)

    expect(heap.peek()).to.be.null
    expect(heap.empty).to.be.true
  })

  it('should push value to heap', () => {
    let heap = new MinHeap<number>((a, b) => a - b)

    heap.push(42)

    expect(heap.peek()).to.equal(42)
    expect(heap.empty).to.be.false
  })

  it('should push values to heap', () => {
    let heap = new MinHeap<number>((a, b) => a - b)

    heap.push(43)
    heap.push(44)
    heap.push(46)
    heap.push(42)

    expect(heap.peek()).to.equal(42)
    expect(heap.empty).to.be.false
  })
})
