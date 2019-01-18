import { HashMap } from '../hash'

class TrieNode {
  readonly children = new HashMap<TrieNode>()

  constructor(readonly character: string, readonly isCompleteWord = false) {}

  addChild(character: string, isCompleteWord = false) {
    if (this.children.has(character)) {
      return this.children.get(character)!
    }

    return this.children.set(
      character,
      new TrieNode(character, isCompleteWord)
    )
  }

  toString() {
    return this.isCompleteWord ? this.character : '*'
  }
}

export class Trie {
  root = new TrieNode('')

  addWord(str: string): void {
    let currentNode = this.root

    for (let i = 0; i < str.length; i++) {
      currentNode = currentNode.addChild(str[i], i === str.length - 1)
    }
  }

  getWords(): string[] {
    let words: string[] = []

    this.traverseDF(this.root, '', (character, word, isCompleteWord) => {
      if (isCompleteWord) {
        words.push(word)
      }
    })

    return words
  }

  private traverseDF(
    node: TrieNode,
    currentWord: string,
    callback: (
      char: string,
      currentWord: string,
      isCompleteWord: boolean
    ) => void
  ) {
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
