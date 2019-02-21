import { MaxHeap } from './max-heap'

describe('MaxHeap', () => {
  test('should create empty heap', () => {
    let heap = new MaxHeap()

    expect(heap.peek()).toBeNull()
    expect(heap.empty).toBe(true)
  })

  test('should push value to heap', () => {
    let heap = new MaxHeap()

    heap.push(42)

    expect(heap.peek()).toBe(42)
    expect(heap.empty).toBe(false)
  })

  test('should push values to heap', () => {
    let heap = new MaxHeap()

    heap.push(43)
    heap.push(44)
    heap.push(46)
    heap.push(42)

    expect(heap.peek()).toBe(46)
    expect(heap.empty).toBe(false)
  })
})
