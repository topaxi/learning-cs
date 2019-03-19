import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'
import { BinaryTreePrinter } from '../utils/print-binary-tree'

export function print(val: any, _serialize: any, _indent: any): string {
  let printer = new BinaryTreePrinter()

  return `${val.constructor.name}:\n${printer.print(val.root || val)}`
}

export function test(val: any): boolean {
  if (val && val.hasOwnProperty('root')) val = val.root

  return val instanceof BinaryTreeNode
}
