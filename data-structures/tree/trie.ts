import { HashMap } from '../hash/hash-map'
import { lastIndex } from '../../utils/array/last-index'

class TrieNode {
  readonly children = new HashMap<string, TrieNode>()

  constructor(readonly character: string, public isCompleteWord = false) {}

  addChild(character: string, isCompleteWord = false): TrieNode {
    if (this.children.has(character)) {
      let node = this.children.get(character)!

      node.isCompleteWord = node.isCompleteWord || isCompleteWord

      return node
    }

    return this.children.set(
      character,
      new TrieNode(character, isCompleteWord)
    )
  }

  toString(): string {
    return this.character
  }
}

export class Trie {
  root = new TrieNode('')

  addWord(str: string): void {
    let currentNode = this.root

    for (let i = 0; i < str.length; i++) {
      currentNode = currentNode.addChild(str[i], i === lastIndex(str))
    }
  }

  getWords(startNode = this.root, word = ''): string[] {
    let words: string[] = []

    this.traverseDF(
      startNode,
      word,
      (character, currentWord, isCompleteWord) => {
        if (isCompleteWord) {
          words.push(currentWord)
        }
      }
    )

    return words
  }

  suggestWords(partialWord: string): string[] {
    if (partialWord === '') return []

    let currentNode = this.root

    for (let character of partialWord) {
      if (!currentNode.children.has(character)) {
        return []
      }

      currentNode = currentNode.children.get(character)!
    }

    return this.getWords(currentNode, partialWord.slice(0, -1))
  }

  private traverseDF(
    node: TrieNode,
    currentWord: string,
    callback: (
      char: string,
      currentWord: string,
      isCompleteWord: boolean
    ) => void
  ): void {
    if (this.root !== node) {
      callback(
        node.character,
        currentWord + node.character,
        node.isCompleteWord
      )
    }

    for (let n of node.children.values()) {
      this.traverseDF(n, currentWord + node.character, callback)
    }
  }
}
