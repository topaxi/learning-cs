import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'
import { BinaryTreePrinter } from '../utils/print-binary-tree'

export function print(
  val:
    | { root: BinaryTreeNode<unknown, unknown> }
    | BinaryTreeNode<unknown, unknown>,
  _serialize: unknown,
  _indent: unknown
): string {
  let printer = new BinaryTreePrinter()

  return `${val.constructor.name}:\n${printer.print(
    'root' in val ? val.root : val
  )}`
}

export function test<T, U>(val: unknown): val is BinaryTreeNode<T, U> {
  if (
    val != null &&
    typeof val === 'object' &&
    Reflect.has(val as object, 'root')
  ) {
    val = (val as { root: unknown }).root
  }

  return val instanceof BinaryTreeNode
}
