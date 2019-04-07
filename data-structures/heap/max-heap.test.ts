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
})
