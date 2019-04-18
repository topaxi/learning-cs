import { range } from '../../utils/range'
import { GraphVertex, GraphEdge } from '../../data-structures'
import { dijkstra } from './dijkstra'

describe('dijkstra', () => {
  test('should find shortest path', () => {
    let v = Array.from(range(10), v => new GraphVertex(v))

    v[0].addEdge(new GraphEdge(v[0], v[1], 1))
    v[1].addEdge(new GraphEdge(v[1], v[2], 1))
    v[2].addEdge(new GraphEdge(v[2], v[4], 1))
    v[4].addEdge(new GraphEdge(v[4], v[3], 0))
    v[3].addEdge(new GraphEdge(v[3], v[2], 1))
    v[1].addEdge(new GraphEdge(v[1], v[5], 4))
    v[1].addEdge(new GraphEdge(v[1], v[6], 4))
    v[5].addEdge(new GraphEdge(v[5], v[6], 5))
    v[6].addEdge(new GraphEdge(v[6], v[7], 4))
    v[5].addEdge(new GraphEdge(v[5], v[7], 3))

    const { distances, previous } = dijkstra(v, v[0])

    expect(
      Array.from(
        distances,
        ([vertex, distance]) =>
          `The cost to get from node ${v[0]} to ${vertex} is ${distance}`
      )
    ).toMatchInlineSnapshot(`
                        Array [
                          "The cost to get from node 0 to 0 is 0",
                          "The cost to get from node 0 to 1 is 1",
                          "The cost to get from node 0 to 2 is 2",
                          "The cost to get from node 0 to 3 is 3",
                          "The cost to get from node 0 to 4 is 3",
                          "The cost to get from node 0 to 5 is 5",
                          "The cost to get from node 0 to 6 is 5",
                          "The cost to get from node 0 to 7 is 8",
                        ]
                `)

    function path(
      vertex: GraphVertex<number>,
      previousVertex?: GraphVertex<number> | null
    ): string {
      if (previousVertex == null) return vertex.toString()

      return `${path(
        previousVertex,
        previous.get(previousVertex)
      )} -> ${vertex}`
    }

    expect(
      Array.from(previous, ([vertex, previousVertex]) =>
        path(vertex, previousVertex)
      )
    ).toMatchInlineSnapshot(`
      Array [
        "0 -> 1",
        "0 -> 1 -> 2",
        "0 -> 1 -> 2 -> 4 -> 3",
        "0 -> 1 -> 2 -> 4",
        "0 -> 1 -> 5",
        "0 -> 1 -> 6",
        "0 -> 1 -> 5 -> 7",
      ]
    `)
  })
})
