import { LinkedListNode } from '../data-structures/list/linked-list-node'

export function partition<T>(
  head: LinkedListNode<T>,
  predicate: (value: T) => boolean
): [
  LinkedListNode<T> | null,
  LinkedListNode<T> | null,
  LinkedListNode<T> | null,
  LinkedListNode<T> | null
] {
  let loHead, hiHead
  let lo = (loHead = new LinkedListNode<any>(0))
  let hi = (hiHead = new LinkedListNode<any>(0))

  for (let node of head) {
    if (predicate(node.value) === true) {
      lo.next = node
      lo = lo.next
    } else {
      hi.next = node
      hi = hi.next
    }
  }

  lo.next = null
  hi.next = null

  return [
    loHead.next,
    hiHead.next,
    lo === loHead ? null : lo,
    hi === hiHead ? null : hi,
  ]
}
