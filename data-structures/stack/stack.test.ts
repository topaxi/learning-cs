import { Stack } from './stack'

describe('Stack<T>', () => {
  describe('.from()', () => {
    test('should create stack from iterable', () => {
      expect(Stack.from([1, 2, 3])).toMatchInlineSnapshot(`
        Array [
          3,
          2,
          1,
        ]
      `)
    })

    test('should have an optional project function', () => {
      expect(Stack.from([1, 2, 3], n => n * 2)).toMatchInlineSnapshot(`
        Array [
          6,
          4,
          2,
        ]
      `)

      expect(Stack.from([1, 2, 3], (n, i) => i)).toMatchInlineSnapshot(`
        Array [
          2,
          1,
          0,
        ]
      `)
    })
  })

  describe('.of()', () => {
    test('should create stack of given values', () => {
      expect(Stack.of(1, 2, 3, 4)).toMatchInlineSnapshot(`
        Array [
          4,
          3,
          2,
          1,
        ]
      `)
    })
  })

  describe('#empty', () => {
    test('should describe empty state', () => {
      expect(new Stack().empty).toBe(true)
      expect(Stack.of(1).empty).toBe(false)
    })
  })

  describe('#push()', () => {
    test('should push values onto the stack', () => {
      let stack = new Stack()

      expect(stack).toMatchInlineSnapshot(`Array []`)

      stack.push(1).push(2, 3)

      expect(stack).toMatchInlineSnapshot(`
        Array [
          3,
          2,
          1,
        ]
      `)
    })
  })

  describe('#pop()', () => {
    test('should pop values from the stack', () => {
      let stack = Stack.of(1, 2, 3)

      expect(stack).toMatchInlineSnapshot(`
        Array [
          3,
          2,
          1,
        ]
      `)

      expect(stack.pop()).toBe(3)

      expect(stack).toMatchInlineSnapshot(`
        Array [
          2,
          1,
        ]
      `)
    })
  })

  describe('#peek()', () => {
    test('should return top value on the stack', () => {
      let stack = Stack.of(1, 2, 3)

      expect(stack.peek()).toBe(3)
    })
  })

  describe('consume()', () => {
    test('should return consuming iterator', () => {
      let stack = Stack.of(1, 2, 3)

      expect(Array.from(stack.consume())).toEqual([3, 2, 1])
      expect(stack.empty).toBe(true)
    })
  })
})
