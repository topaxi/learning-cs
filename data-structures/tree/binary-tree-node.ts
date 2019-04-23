import { notNull } from '../../utils/filters/null'
import { filter } from '../../utils/iterator'
import { HashMap } from '../hash/hash-map'
import { Queue } from '../queue/queue'

export class BinaryTreeNode<T = number, M = unknown> {
  readonly meta = new HashMap<string | number, M>()

  private _left: this | null = null
  private _right: this | null = null
  private _parent: this | null = null

  constructor(
    public value: T,
    protected readonly compare: (a: T, b: T) => number = (a: any, b: any) =>
      a - b
  ) {}

  get parent(): this | null {
    return this._parent
  }

  set left(node: this | null) {
    if (this._left !== null) {
      this._left._parent = null
    }

    this._left = node

    if (node !== null) {
      node._parent = this
    }
  }

  get left(): this | null {
    return this._left
  }

  set right(node: this | null) {
    if (this._right !== null) {
      this._right._parent = null
    }

    this._right = node

    if (node !== null) {
      node._parent = this
    }
  }

  get right(): this | null {
    return this._right
  }

  get leftHeight(): number {
    return this._left === null ? 0 : this._left.height + 1
  }

  get rightHeight(): number {
    return this._right === null ? 0 : this._right.height + 1
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  get balanceFactor(): number {
    return this.leftHeight - this.rightHeight
  }

  removeChild(value: T): boolean {
    if (this._left !== null && this.compare(value, this._left.value) === 0) {
      this._left._parent = null
      this._left = null

      return true
    }

    if (this._right !== null && this.compare(value, this._right.value) === 0) {
      this._right._parent = null
      this._right = null

      return true
    }

    return false
  }

  removeChildNode(node: BinaryTreeNode<T, M>): boolean {
    return this.removeChild(node.value)
  }

  replaceChildNode(toReplace: this, replacement: this): boolean {
    if (
      this._left !== null &&
      this.compare(toReplace.value, this._left.value) === 0
    ) {
      this._left = replacement

      return true
    }

    if (
      this._right !== null &&
      this.compare(toReplace.value, this._right.value) === 0
    ) {
      this._right = replacement

      return true
    }

    return false
  }

  *traverseInOrder(): IterableIterator<T> {
    if (this.left !== null) yield* this.left.traverseInOrder()
    yield this.value
    if (this.right !== null) yield* this.right.traverseInOrder()
  }

  *traversePreOrder(): IterableIterator<T> {
    yield this.value
    if (this.left !== null) yield* this.left.traversePreOrder()
    if (this.right !== null) yield* this.right.traversePreOrder()
  }

  *traversePostOrder(): IterableIterator<T> {
    if (this.left !== null) yield* this.left.traversePostOrder()
    if (this.right !== null) yield* this.right.traversePostOrder()
    yield this.value
  }

  *traverseOutOrder(): IterableIterator<T> {
    if (this.right !== null) yield* this.right.traverseOutOrder()
    yield this.value
    if (this.left !== null) yield* this.left.traverseOutOrder()
  }

  *traverseLevelOrder(): IterableIterator<T> {
    let queue = Queue.of<BinaryTreeNode<T> | null>(this)

    for (let node of filter(queue, notNull)) {
      yield node.value
      queue.enqueue(node.left, node.right)
    }
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.traverseInOrder()
  }

  equals(node: BinaryTreeNode<T>): boolean {
    return this.value === node.value
  }

  toJSON(): {
    value: T
    left: BinaryTreeNode<T> | null
    right: BinaryTreeNode<T> | null
  } {
    return {
      value: this.value,
      left: this._left,
      right: this._right
    }
  }
}
