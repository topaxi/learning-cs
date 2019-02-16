import { ClearableWeakmap } from '../../utils/clearable-weakmap'

class MemoMap<T, U> {
  private _weak = new ClearableWeakmap<any, U>()
  private _static = new Map<T, U>()

  private _getMap(key: T) {
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
  readonly children = new MemoMap<any, MemoTrieNode>()
  value = undefined

  constructor(
    readonly arg: any,
    public isCompleteArguments = false,
    value?: any
  ) {
    if (isCompleteArguments === true) {
      this.value = value
    }
  }

  addChild(
    arg: any,
    isCompleteArguments = false,
    value = undefined
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

  toString() {
    return String(this.arg)
  }
}

export class MemoTrie {
  private _root = new MemoTrieNode(null)
  private _lookups = new WeakMap<any[], MemoTrieNode>()

  set(args: any[], value: any): void {
    let currentNode = this._root

    for (let i = 0; i < args.length; i++) {
      currentNode = currentNode.addChild(args[i], i === args.length - 1, value)
    }
  }

  get(args: any[]): any | undefined {
    let node = this._getNode(args)

    return node.isCompleteArguments ? node.value : undefined
  }

  has(args: any[]): boolean {
    return this._getNode(args).isCompleteArguments
  }

  clear(): void {
    this._root.clear()
  }

  private _getNode(args: any[]): MemoTrieNode {
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
