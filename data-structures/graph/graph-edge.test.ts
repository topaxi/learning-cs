import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

describe('GraphEdge<T>', () => {
  test('should take two vertices', () => {
    let startVertex = new GraphVertex(1)
    let endVertex = new GraphVertex(2)

    let edge = new GraphEdge(startVertex, endVertex)

    expect(edge.startVertex).toBe(startVertex)
    expect(edge.endVertex).toBe(endVertex)
  })

  test('should have a default weight of 0', () => {
    let edge = new GraphEdge(new GraphVertex(1), new GraphVertex(2))

    expect(edge.weight).toBe(0)
  })

  test('should take an edge weight', () => {
    let edge = new GraphEdge(new GraphVertex(1), new GraphVertex(2), 20)

    expect(edge.weight).toBe(20)
  })

  describe('#reverse()', () => {
    test('should swap start and end vertex', () => {
      let startVertex = new GraphVertex(1)
      let endVertex = new GraphVertex(2)

      let edge = new GraphEdge(startVertex, endVertex)

      expect(edge.startVertex).toBe(startVertex)
      expect(edge.endVertex).toBe(endVertex)

      edge.reverse()

      expect(edge.startVertex).toBe(endVertex)
      expect(edge.endVertex).toBe(startVertex)
    })
  })

  describe('#clone()', () => {
    test('should return a clone', () => {
      let startVertex = new GraphVertex(1)
      let endVertex = new GraphVertex(2)

      let edge = new GraphEdge(startVertex, endVertex)
      let clone = edge.clone()

      expect(edge.weight).toBe(clone.weight)
      expect(edge.startVertex).toBe(clone.startVertex)
      expect(edge.endVertex).toBe(clone.endVertex)
      expect(edge.id).not.toBe(clone.id)
    })
  })

  describe('#toJSON()', () => {
    test('should exclude id', () => {
      let startVertex = new GraphVertex(1)
      let endVertex = new GraphVertex(2)

      let edge = new GraphEdge(startVertex, endVertex)

      expect(edge.toJSON()).toEqual({
        startVertex,
        endVertex,
        weight: 0
      })
    })
  })

  describe('#toString()', () => {
    test('should return string representation', () => {
      let startVertex = new GraphVertex(1)
      let endVertex = new GraphVertex(2)

      let edge = new GraphEdge(startVertex, endVertex)

      expect(edge.toString()).toEqual('1_2')
    })
  })
})
