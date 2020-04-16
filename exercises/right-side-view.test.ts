import { rightSideView, BinaryTreeNode } from './right-side-view'

describe('199. Binary Tree Right Side View', () => {
  test.each([
    [
      [1, 2, 3, null, 5, null, 4],
      [1, 3, 4],
    ],
    [
      [1, 2, 3, 4],
      [1, 3, 4],
    ],
  ])(
    'should return the right most node value of each level',
    (tree, expected) => {
      expect(rightSideView(buildTree(tree, 0))).toEqual(expected)
    }
  )
})

function buildTree(values: (number | null)[], i: number): BinaryTreeNode {
  if (values[i] == null) {
    return null!
  }

  return {
    val: values[i]!,
    left: buildTree(values, 2 * i + 1),
    right: buildTree(values, 2 * i + 2),
  }
}
