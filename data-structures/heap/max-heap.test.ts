import { MaxHeap } from './max-heap'
import { range } from '../../utils'

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
    heap.push(44)

    expect(heap).toMatchInlineSnapshot(`
                        Array [
                          46,
                          44,
                          44,
                          42,
                          43,
                        ]
                `)

    expect(Array.from(heap.consume())).toMatchInlineSnapshot(`
                  Array [
                    46,
                    44,
                    44,
                    43,
                    42,
                  ]
            `)
  })

  test('should pop values from the heap', () => {
    let heap = new MaxHeap()

    heap.push(43)
    heap.push(44)
    heap.push(42)
    heap.push(46)
    heap.push(42)

    expect(heap).toMatchInlineSnapshot(`
            Array [
              46,
              44,
              42,
              43,
              42,
            ]
        `)

    expect(heap.pop()).toBe(46)

    expect(heap).toMatchInlineSnapshot(`
            Array [
              44,
              43,
              42,
              42,
            ]
        `)

    expect(heap.pop()).toBe(44)

    expect(heap).toMatchInlineSnapshot(`
                        Array [
                          43,
                          42,
                          42,
                        ]
                `)

    expect(Array.from(heap.consume())).toMatchInlineSnapshot(`
                              Array [
                                43,
                                42,
                                42,
                              ]
                    `)
  })

  test('should be able to return index of element', () => {
    let heap = new MaxHeap<number>()

    heap.push(1, 2, 3, 4, 5, 6)

    expect(heap.indexOf(4)).not.toBe(-1)
    expect(heap.indexOf(4)).toBe(1)
  })

  test('should be able to delete value', () => {
    let heap = new MaxHeap<number>()

    heap.push(...range(0, 5))

    expect(heap.delete(3)).toBe(3)
    expect(Array.from(heap.consume())).toMatchInlineSnapshot(`
      Array [
        4,
        2,
        1,
        0,
      ]
    `)

    heap.push(...range(1, 4))
    expect(heap.delete(2)).toBe(2)
  })
})
