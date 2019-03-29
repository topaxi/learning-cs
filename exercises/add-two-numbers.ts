import { LinkedListNode } from '../data-structures'

export function addTwoNumbers(
  l1: LinkedListNode<number> | null,
  l2: LinkedListNode<number> | null
): LinkedListNode<number> | null {
  let base = 10
  let carry = 0
  let rootNode = null
  let currentNode: LinkedListNode<number>

  while (l1 !== null || l2 !== null) {
    let sum = carry

    if (l1 !== null) {
      sum += l1.value
      l1 = l1.next
    }
    if (l2 !== null) {
      sum += l2.value
      l2 = l2.next
    }

    carry = (sum / base) | 0

    let node = new LinkedListNode(sum % base)

    if (rootNode === null) {
      rootNode = currentNode = node
    } else {
      currentNode = currentNode!.next = node
    }
  }

  if (carry !== 0) {
    currentNode!.next = new LinkedListNode(carry)
  }

  return rootNode
}
