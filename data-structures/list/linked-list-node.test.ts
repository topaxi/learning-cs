import { prop } from '../../utils/object/prop'
import { range } from '../../utils/range'
import { LinkedListNode } from './linked-list-node'

describe('LinkedListNode<T>', () => {
  describe('of()', () => {
    test('should create nodes of given values', () => {
      expect(LinkedListNode.of(1, 2, 3, 4)).toMatchInlineSnapshot(`
        LinkedListNode {
          "next": LinkedListNode {
            "next": LinkedListNode {
              "next": LinkedListNode {
                "next": null,
                "value": 4,
              },
              "value": 3,
            },
            "value": 2,
          },
          "value": 1,
        }
      `)
    })
  })

  describe('from()', () => {
    test('should create nodes from given iterator', () => {
      expect(LinkedListNode.from(range(1, 4, { inclusive: true })))
        .toMatchInlineSnapshot(`
        LinkedListNode {
          "next": LinkedListNode {
            "next": LinkedListNode {
              "next": LinkedListNode {
                "next": null,
                "value": 4,
              },
              "value": 3,
            },
            "value": 2,
          },
          "value": 1,
        }
      `)
    })

    test('should take optional project function', () => {
      expect(LinkedListNode.from(range(1, 4, { inclusive: true }), n => n * 2))
        .toMatchInlineSnapshot(`
        LinkedListNode {
          "next": LinkedListNode {
            "next": LinkedListNode {
              "next": LinkedListNode {
                "next": null,
                "value": 8,
              },
              "value": 6,
            },
            "value": 4,
          },
          "value": 2,
        }
      `)

      expect(LinkedListNode.from(range(0, 4), (_n, i) => i))
        .toMatchInlineSnapshot(`
        LinkedListNode {
          "next": LinkedListNode {
            "next": LinkedListNode {
              "next": LinkedListNode {
                "next": null,
                "value": 3,
              },
              "value": 2,
            },
            "value": 1,
          },
          "value": 0,
        }
      `)
    })
  })

  describe('#[Symbol.iterator]()', () => {
    test('should be iterable through all nodes', () => {
      let node = new LinkedListNode(
        1,
        new LinkedListNode(2, new LinkedListNode(3, new LinkedListNode(4)))
      )

      expect(Array.from(node, prop('value'))).toEqual([1, 2, 3, 4])
      expect(Array.from(new LinkedListNode(1), prop('value'))).toEqual([1])
    })
  })

  describe('#last()', () => {
    test('should return last node', () => {
      let last = new LinkedListNode(4)
      let node = new LinkedListNode(
        1,
        new LinkedListNode(2, new LinkedListNode(3, last))
      )

      expect(node.last()).toBe(last)
      expect(last.last()).toBe(last)
    })
  })

  describe('#reverse()', () => {
    test('should reverse list nodes', () => {
      expect(LinkedListNode.of(1, 2, 3, 4, 5).reverse()).toEqual(
        LinkedListNode.of(5, 4, 3, 2, 1)
      )
    })
  })
})
