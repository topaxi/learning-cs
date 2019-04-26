import { prop } from '../../utils/object/prop'
import { paR } from '../../utils/function/partial'

export interface ListNode {
  next: ListNode | null
}

export function* traverseNodes<T>(
  node: T | null,
  next: (node: T) => T
): IterableIterator<T> {
  for (; node !== null; node = next(node) as any) {
    yield node
  }
}

export const traverseNext: <T extends ListNode>(
  node: T | null
) => IterableIterator<T> = paR(traverseNodes, prop<any>('next'))

export interface ListNodePrev {
  prev: ListNodePrev | null
}

export const traversePrev: <T extends ListNodePrev>(
  node: T | null
) => IterableIterator<T> = paR(traverseNodes, prop<any>('prev'))
