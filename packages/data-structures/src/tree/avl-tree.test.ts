import { AvlTree } from './avl-tree'

describe('AvlTree', () => {
  test('is a binary tree', () => {
    let tree = new AvlTree()

    tree.insert(0)
    tree.insert(5)
    tree.insert(1)
    tree.insert(7)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(6)

    expect(tree).toMatchSnapshot()
    expect(tree.balanceFactor).toBeLessThanOrEqual(1)
    expect(tree.balanceFactor).toBeGreaterThanOrEqual(-1)
  })

  test('leftLeft rotation', () => {
    let tree = new AvlTree()

    tree.insert(5)
    tree.insert(4)
    tree.insert(3)
    tree.insert(2)
    tree.insert(1)
    tree.insert(0)

    expect(tree).toMatchSnapshot()
  })

  test('leftRight rotation', () => {
    let tree = new AvlTree()

    tree.insert(4)
    tree.insert(0)
    tree.insert(3)
    tree.insert(1)
    tree.insert(2)

    expect(tree).toMatchSnapshot()
  })

  test('rightRight rotation', () => {
    let tree = new AvlTree()

    tree.insert(0)
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)

    expect(tree).toMatchSnapshot()
  })

  test('rightLeft rotation', () => {
    let tree = new AvlTree()

    tree.insert(0)
    tree.insert(2)
    tree.insert(1)
    tree.insert(4)
    tree.insert(3)

    expect(tree).toMatchSnapshot()
  })

  test('is a balanced binary tree', () => {
    let tree = new AvlTree()

    tree.insert(4)
    tree.insert(1)
    tree.insert(6)

    expect(tree).toMatchSnapshot()

    tree.insert(2)

    expect(tree).toMatchSnapshot()

    tree.insert(3)

    expect(tree).toMatchSnapshot()

    tree.insert(0)

    expect(tree).toMatchSnapshot()

    tree.insert(5)

    expect(tree).toMatchSnapshot()

    tree.insert(7)

    expect(tree).toMatchSnapshot()

    expect(tree.balanceFactor).toBeLessThanOrEqual(1)
    expect(tree.balanceFactor).toBeGreaterThanOrEqual(-1)
  })
})
