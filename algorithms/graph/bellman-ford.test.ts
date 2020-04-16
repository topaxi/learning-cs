import { range } from '../../utils/range'
import { construct } from '../../utils/function/construct'
import { GraphVertex } from '../../data-structures/graph/graph-vertex'
import { GraphEdge } from '../../data-structures/graph/graph-edge'
import { bellmanFord } from './bellman-ford'

describe('bellmanFord()', () => {
  // TestCase from https://github.com/williamfiset/Algorithms/blob/master/com/williamfiset/algorithms/graphtheory/BellmanFordEdgeList.java
  test('finds shortest paths', () => {
    let v = Array.from(range(10), construct(GraphVertex))

    let edges = [
      new GraphEdge(v[0], v[1], 1),
      new GraphEdge(v[1], v[2], 1),
      new GraphEdge(v[2], v[4], 1),
      new GraphEdge(v[4], v[3], -3),
      new GraphEdge(v[3], v[2], 1),
      new GraphEdge(v[1], v[5], 4),
      new GraphEdge(v[1], v[6], 4),
      new GraphEdge(v[5], v[6], 5),
      new GraphEdge(v[6], v[7], 4),
      new GraphEdge(v[5], v[7], 3),
    ]

    expect(
      bellmanFord(edges, v, v[0]).map(
        ([vertex, distance]) =>
          `The cost to get from node ${v[0]} to ${vertex} is ${distance}`
      )
    ).toMatchInlineSnapshot(`
      Array [
        "The cost to get from node 0 to 0 is 0",
        "The cost to get from node 0 to 1 is 1",
        "The cost to get from node 0 to 2 is -Infinity",
        "The cost to get from node 0 to 3 is -Infinity",
        "The cost to get from node 0 to 4 is -Infinity",
        "The cost to get from node 0 to 5 is 5",
        "The cost to get from node 0 to 6 is 5",
        "The cost to get from node 0 to 7 is 8",
        "The cost to get from node 0 to 8 is Infinity",
        "The cost to get from node 0 to 9 is Infinity",
      ]
    `)
  })
})
