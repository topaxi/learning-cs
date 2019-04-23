import { MinHeap } from './min-heap'
import { range } from '../../utils/range'

describe('MinHeap', () => {
  test('should create empty heap', () => {
    let heap = new MinHeap()

    expect(heap.peek()).toBeNull()
    expect(heap.empty).toBe(true)
  })

  test('should push value to heap', () => {
    let heap = new MinHeap()

    heap.push(42)

    expect(heap.peek()).toBe(42)
    expect(heap.empty).toBe(false)
  })

  test('should push values to heap', () => {
    let heap = new MinHeap()

    heap.push(43)
    heap.push(44)
    heap.push(46)
    heap.push(42)
    heap.push(44)

    expect(heap).toMatchInlineSnapshot(`
                              Array [
                                42,
                                43,
                                46,
                                44,
                                44,
                              ]
                    `)

    expect(Array.from(heap.consume())).toMatchInlineSnapshot(`
                                    Array [
                                      42,
                                      43,
                                      44,
                                      44,
                                      46,
                                    ]
                        `)
  })

  test('should pop values from the heap', () => {
    let heap = new MinHeap()

    heap.push(43)
    heap.push(44)
    heap.push(42)
    heap.push(46)
    heap.push(42)

    expect(heap).toMatchInlineSnapshot(`
                        Array [
                          42,
                          42,
                          43,
                          46,
                          44,
                        ]
                `)

    expect(heap.pop()).toBe(42)

    expect(heap).toMatchInlineSnapshot(`
                        Array [
                          42,
                          44,
                          43,
                          46,
                        ]
                `)

    expect(heap.pop()).toBe(42)

    expect(heap).toMatchInlineSnapshot(`
                              Array [
                                43,
                                44,
                                46,
                              ]
                    `)

    expect(Array.from(heap.consume())).toMatchInlineSnapshot(`
                                          Array [
                                            43,
                                            44,
                                            46,
                                          ]
                            `)
  })

  test('should be able to return index of element', () => {
    let heap = new MinHeap<number>()

    heap.push(1, 2, 3, 4, 5, 6)

    expect(heap.indexOf(4)).not.toBe(-1)
    expect(heap.indexOf(4)).toBe(3)
  })

  test('should be able to delete value', () => {
    let heap = new MinHeap<number>()

    heap.push(...range(0, 5))

    expect(heap.delete(3)).toBe(3)
    expect(Array.from(heap.consume())).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
        4,
      ]
    `)

    heap.push(...range(1, 4))
    expect(heap.delete(2)).toBe(2)
  })
})
