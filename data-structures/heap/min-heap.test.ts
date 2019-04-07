import { MinHeap } from './min-heap'

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
})
