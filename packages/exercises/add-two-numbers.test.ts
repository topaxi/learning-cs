import { LinkedListNode } from '../data-structures/list/linked-list-node'
import { addTwoNumbers } from './add-two-numbers'

describe('addTwoNumbers', () => {
  test('should add two numbers using a linked list', () => {
    let l1 = new LinkedListNode(
      2,
      new LinkedListNode(4, new LinkedListNode(3))
    )
    let l2 = new LinkedListNode(
      5,
      new LinkedListNode(6, new LinkedListNode(4))
    )

    expect(addTwoNumbers(l1, l2)).toEqual(
      new LinkedListNode(7, new LinkedListNode(0, new LinkedListNode(8)))
    )
  })
})
