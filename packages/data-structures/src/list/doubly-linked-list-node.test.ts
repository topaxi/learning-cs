import { prop } from '../../utils/object/prop'
import { range } from '../../utils/range'
import { DoublyLinkedListNode } from './doubly-linked-list-node'

describe('DoublyLinkedListNode<T>', () => {
  describe('of()', () => {
    test('should create nodes of given values', () => {
      let node = DoublyLinkedListNode.of(1, 2, 3, 4)

      expect(node.next!.prev).toBe(node)
      expect(node.next!.next!.prev).toBe(node.next)

      expect(node).toMatchInlineSnapshot(`
        DoublyLinkedListNode {
          "next": DoublyLinkedListNode {
            "next": DoublyLinkedListNode {
              "next": DoublyLinkedListNode {
                "next": null,
                "prev": [Circular],
                "value": 4,
              },
              "prev": [Circular],
              "value": 3,
            },
            "prev": [Circular],
            "value": 2,
          },
          "prev": null,
          "value": 1,
        }
      `)
    })
  })

  describe('from()', () => {
    test('should create nodes from given iterator', () => {
      expect(DoublyLinkedListNode.from(range(1, 4, { inclusive: true })))
        .toMatchInlineSnapshot(`
        DoublyLinkedListNode {
          "next": DoublyLinkedListNode {
            "next": DoublyLinkedListNode {
              "next": DoublyLinkedListNode {
                "next": null,
                "prev": [Circular],
                "value": 4,
              },
              "prev": [Circular],
              "value": 3,
            },
            "prev": [Circular],
            "value": 2,
          },
          "prev": null,
          "value": 1,
        }
      `)
    })
  })

  describe('#[Symbol.iterator]()', () => {
    test('should be iterable through all nodes', () => {
      let node = DoublyLinkedListNode.of(1, 2, 3, 4)

      expect(Array.from(node, prop('value'))).toEqual([1, 2, 3, 4])
      expect(Array.from(new DoublyLinkedListNode(1), prop('value'))).toEqual([
        1,
      ])
    })
  })

  describe('#last()', () => {
    test('should return last node', () => {
      let node = DoublyLinkedListNode.of(1, 2, 3)

      expect(node.last().value).toBe(3)
      expect(node.last().last().value).toBe(3)
    })
  })

  describe('#reverse()', () => {
    test('should reverse list nodes', () => {
      expect(DoublyLinkedListNode.of(1, 2, 3, 4, 5).reverse()).toEqual(
        DoublyLinkedListNode.of(5, 4, 3, 2, 1)
      )
    })
  })

  describe('#reduce()', () => {
    test('should reduce to a value', () => {
      expect(
        DoublyLinkedListNode.of(1, 2, 3, 4).reduce(
          (a, b, i) => `${a}${b}(${i})`,
          ''
        )
      ).toBe('1(0)2(1)3(2)4(3)')
    })
  })

  describe('#reduceRight()', () => {
    test('should reduce to a value', () => {
      expect(
        DoublyLinkedListNode.of(4, 3, 2, 1)
          .last()
          .reduceRight((a, b) => `${a}${b}`, '')
      ).toBe('1234')
    })
  })
})
