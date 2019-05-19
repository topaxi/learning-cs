// Based on http://web.archive.org/web/20090617110918/http://www.openasthra.com/c-tidbits/printing-binary-trees-in-ascii/
import { BinaryTreeNode } from '../data-structures/tree/binary-tree-node'
import { range } from './range'

const { min, max, floor } = Math

const MAX_HEIGHT = 1000

class AsciiNode {
  left: AsciiNode | null = null
  right: AsciiNode | null = null

  edgeLength = 0

  height = 0
  label = ''

  //-1=I am left, 0=I am root, 1=right
  parentDir: -1 | 0 | 1 = 0
}

export class BinaryTreePrinter<T extends BinaryTreeNode<any, any>> {
  private lprofile = new Int16Array(this.maxHeight)
  private rprofile = new Int16Array(this.maxHeight)
  private gap = 3
  private printNext = 0
  private out = ''

  constructor(private readonly maxHeight = MAX_HEIGHT) {}

  //prints ascii tree for given Tree structure
  print(root: T): string {
    if (root === null) return ''

    let proot = this.buildAsciiTree(root)!
    this.computeEdgeLengths(proot)
    for (let i = 0; i < proot.height && i < this.maxHeight; i++) {
      this.lprofile[i] = 0x7fff
    }

    this.computeLprofile(proot, 0, 0)
    let xmin = 0
    for (let i = 0; i < proot.height && i < this.maxHeight; i++) {
      xmin = min(xmin, this.lprofile[i])
    }

    for (let i of range(proot.height)) {
      this.printNext = 0
      this.printLevel(proot, -xmin, i)
      this.printf('\n')
    }

    if (proot.height >= this.maxHeight) {
      this.printf(
        `(This tree is taller than ${
          this.maxHeight
        }, and may be drawn incorrectly.)\n`
      )
    }

    return this.out.trimRight()
  }

  printf(str: string): void {
    this.out += str
  }

  //This function prints the given level of the given tree, assuming
  //that the node has the given x cordinate.
  private printLevel(node: AsciiNode | null, x: number, level: number): void {
    if (node === null) return

    let isleft = node.parentDir === -1 ? 1 : 0

    if (level === 0) {
      let i = 0
      for (
        ;
        i < x - this.printNext - floor((node.label.length - isleft) / 2);
        i++
      ) {
        this.printf(' ')
      }
      this.printNext += i
      this.printf(node.label)
      this.printNext += node.label.length
    } else if (node.edgeLength >= level) {
      if (node.left != null) {
        let i = 0
        for (; i < x - this.printNext - level; i++) {
          this.printf(' ')
        }
        this.printNext += i
        this.printf('/')
        this.printNext++
      }
      if (node.right != null) {
        let i = 0
        for (; i < x - this.printNext + level; i++) {
          this.printf(' ')
        }
        this.printNext += i
        this.printf('\\')
        this.printNext++
      }
    } else {
      this.printLevel(
        node.left,
        x - node.edgeLength - 1,
        level - node.edgeLength - 1
      )
      this.printLevel(
        node.right,
        x + node.edgeLength + 1,
        level - node.edgeLength - 1
      )
    }
  }

  //This function fills in the edgeLength and
  //height fields of the specified tree
  // eslint-disable-next-line
  private computeEdgeLengths(node: AsciiNode | null): void {
    if (node === null) return

    this.computeEdgeLengths(node.left)
    this.computeEdgeLengths(node.right)

    /* first fill in the edgeLength of node */
    if (node.right === null && node.left === null) {
      node.edgeLength = 0
    } else {
      let hmin: number

      if (node.left != null) {
        for (let i = -1; i < node.left.height && i < this.maxHeight; i++) {
          this.rprofile[i] = -0x8000
        }
        this.computeRprofile(node.left, -1, 0)
        hmin = node.left.height
      } else {
        hmin = 0
      }
      if (node.right != null) {
        for (let i = 0; i < node.right.height && i < this.maxHeight; i++) {
          this.lprofile[i] = 0x7fff
        }
        this.computeLprofile(node.right, 0, 0)
        hmin = min(node.right.height, hmin)
      } else {
        hmin = 0
      }
      let delta = 4
      for (let i of range(hmin)) {
        delta = max(delta, this.gap + 1 + this.rprofile[i] - this.lprofile[i])
      }

      //If the node has two children of height 1, then we allow the
      //two leaves to be within 1, instead of 2
      if (
        ((node.left != null && node.left.height === 1) ||
          (node.right != null && node.right.height === 1)) &&
        delta > 4
      ) {
        delta--
      }

      node.edgeLength = floor((delta + 1) / 2) - 1
    }

    //now fill in the height of node
    let h = 1
    if (node.left != null) {
      h = max(node.left.height + node.edgeLength + 1, h)
    }
    if (node.right != null) {
      h = max(node.right.height + node.edgeLength + 1, h)
    }
    node.height = h
  }

  private buildAsciiTreeRecursive(root: T | null): AsciiNode | null {
    if (root === null) return null

    let node = new AsciiNode()
    node.label = String(root.value)
    node.left = this.buildAsciiTreeRecursive(root.left)
    node.right = this.buildAsciiTreeRecursive(root.right)

    if (node.left !== null) {
      node.left.parentDir = -1
    }

    if (node.right !== null) {
      node.right.parentDir = 1
    }

    return node
  }

  //Copy the tree into the ascii node structre
  private buildAsciiTree(root: T): AsciiNode | null {
    if (root === null) return null

    let node = this.buildAsciiTreeRecursive(root)!
    node.parentDir = 0
    return node
  }

  //The following function fills in the lprofile array for the given tree.
  //It assumes that the center of the label of the root of this tree
  //is located at a position (x,y).  It assumes that the edgeLength
  //fields have been computed for this tree.
  private computeLprofile(node: AsciiNode | null, x: number, y: number): void {
    if (node === null) return

    let isleft = node.parentDir === -1 ? 1 : 0

    this.lprofile[y] = min(
      this.lprofile[y],
      x - floor((node.label.length - isleft) / 2)
    )

    if (node.left !== null) {
      for (let i = 1; i <= node.edgeLength && y + i < this.maxHeight; i++) {
        this.lprofile[y + i] = min(this.lprofile[y + i], x - i)
      }
    }

    this.computeLprofile(
      node.left,
      x - node.edgeLength - 1,
      y + node.edgeLength + 1
    )
    this.computeLprofile(
      node.right,
      x + node.edgeLength + 1,
      y + node.edgeLength + 1
    )
  }

  private computeRprofile(node: AsciiNode | null, x: number, y: number): void {
    if (node === null) return

    let notleft = node.parentDir != -1 ? 1 : 0

    this.rprofile[y] = max(
      this.rprofile[y],
      x + floor((node.label.length - notleft) / 2)
    )

    if (node.right !== null) {
      for (let i = 1; i <= node.edgeLength && y + i < this.maxHeight; i++) {
        this.rprofile[y + i] = max(this.rprofile[y + i], x + i)
      }
    }

    this.computeRprofile(
      node.left,
      x - node.edgeLength - 1,
      y + node.edgeLength + 1
    )
    this.computeRprofile(
      node.right,
      x + node.edgeLength + 1,
      y + node.edgeLength + 1
    )
  }
}

export function printBinaryTree(tree: BinaryTreeNode<unknown, unknown>): void {
  console.log(new BinaryTreePrinter().print(tree))
}
