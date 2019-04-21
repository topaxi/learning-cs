import { ClearableWeakmap } from '../../utils/function/memoize/clearable-weakmap'
import { lastIndex } from '../../utils'

class MemoMap<T, U> {
  private _weak = new ClearableWeakmap<object, U>()
  private _static = new Map<T, U>()

  private _getMap(key: T): Map<T, U>
  private _getMap(key: object): WeakMap<object, U>
  private _getMap(key: T | object): unknown {
    return key !== null && typeof key === 'object' ? this._weak : this._static
  }

  has(key: T): boolean {
    return this._getMap(key).has(key)
  }

  get(key: T): U | undefined {
    return this._getMap(key).get(key)
  }

  set<V extends U>(key: T, value: V): this {
    this._getMap(key).set(key, value)
    return this
  }

  clear(): void {
    this._weak.clear()
    this._static.clear()
  }
}

class MemoTrieNode {
  readonly children = new MemoMap<unknown, MemoTrieNode>()
  value: unknown = undefined

  constructor(
    readonly arg: unknown,
    public isCompleteArguments = false,
    value?: unknown
  ) {
    if (isCompleteArguments === true) {
      this.value = value
    }
  }

  addChild(
    arg: unknown,
    isCompleteArguments = false,
    value: unknown = undefined
  ): MemoTrieNode {
    if (this.children.has(arg)) {
      let node = this.children.get(arg)!

      node.isCompleteArguments =
        node.isCompleteArguments || isCompleteArguments

      if (node.isCompleteArguments === true) {
        node.value = value
      }

      return node
    }

    let node = new MemoTrieNode(arg, isCompleteArguments, value)
    this.children.set(arg, node)
    return node
  }

  clear(): void {
    this.children.clear()
  }

  toString(): string {
    return String(this.arg)
  }
}

export class MemoTrie {
  private _root = new MemoTrieNode(null)
  private _lookups = new WeakMap<unknown[], MemoTrieNode>()

  set(args: unknown[], value: unknown): void {
    let currentNode = this._root

    for (let i = 0; i < args.length; i++) {
      currentNode = currentNode.addChild(args[i], i === lastIndex(args), value)
    }
  }

  get(args: unknown[]): unknown | undefined {
    let node = this._getNode(args)

    return node.isCompleteArguments ? node.value : undefined
  }

  has(args: unknown[]): boolean {
    return this._getNode(args).isCompleteArguments
  }

  clear(): void {
    this._root.clear()
  }

  private _getNode(args: unknown[]): MemoTrieNode {
    let node = this._lookups.get(args)
    if (node !== undefined) return node
    node = this._root
    for (let i = 0; i < args.length; i++) {
      if (!node.children.has(args[i])) break

      node = node.children.get(args[i])!
    }
    this._lookups.set(args, node)
    return node
  }
}
