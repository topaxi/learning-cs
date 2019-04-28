import { LinkedListNode } from '../data-structures/list/linked-list-node'
import { partition } from './partition-linked-list'
import { lt, gt } from '../utils/filters/eq'

describe('86. Partition List', () => {
  test('should partition linked list nodes', () => {
    expect(partition(LinkedListNode.of(1, 4, 3, 2, 5, 2), lt(3))).toEqual([
      LinkedListNode.of(1, 2, 2),
      LinkedListNode.of(4, 3, 5),
      new LinkedListNode(2),
      new LinkedListNode(5)
    ])

    expect(partition(LinkedListNode.of(1, 4, 3, 2, 5, 2), lt(2))).toEqual([
      LinkedListNode.of(1),
      LinkedListNode.of(4, 3, 2, 5, 2),
      new LinkedListNode(1),
      new LinkedListNode(2)
    ])

    expect(partition(LinkedListNode.of(1, 4, 3, 2, 5, 2), lt(1))).toEqual([
      null,
      LinkedListNode.of(1, 4, 3, 2, 5, 2),
      null,
      new LinkedListNode(2)
    ])

    expect(partition(LinkedListNode.of(1, 4, 3, 2, 5, 2), gt(0))).toEqual([
      LinkedListNode.of(1, 4, 3, 2, 5, 2),
      null,
      new LinkedListNode(2),
      null
    ])
  })
})
