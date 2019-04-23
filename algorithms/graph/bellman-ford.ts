import { lastIndex } from '../../utils/array/last-index'
import { filter } from '../../utils/iterator'
import { HashMap } from '../../data-structures/hash/hash-map'
import { GraphEdge } from '../../data-structures/graph/graph-edge'
import { GraphVertex } from '../../data-structures/graph/graph-vertex'

export function bellmanFord<T>(
  edges: readonly GraphEdge<T>[],
  vertices: readonly GraphVertex<T>[],
  startVertex: GraphVertex<T>
): [GraphVertex<T>, number][] {
  let distances = new HashMap<GraphVertex<T>, number>(vertices.length)

  for (let vertex of vertices) distances.set(vertex, Infinity)

  distances.set(startVertex, 0)

  const isShorterDistance = (edge: GraphEdge<T>): boolean =>
    distances.get(edge.startVertex)! + edge.weight <
    distances.get(edge.endVertex)!

  for (
    let i = 0, didRelaxEdge = true;
    i < lastIndex(vertices) && didRelaxEdge;
    i++
  ) {
    didRelaxEdge = false
    for (let edge of filter(edges, isShorterDistance)) {
      distances.set(
        edge.endVertex,
        distances.get(edge.startVertex)! + edge.weight
      )
      didRelaxEdge = true
    }
  }

  for (
    let i = 0, didRelaxEdge = true;
    i < lastIndex(vertices) && didRelaxEdge;
    i++
  ) {
    didRelaxEdge = false
    for (let edge of filter(edges, isShorterDistance)) {
      distances.set(edge.endVertex, -Infinity)
      didRelaxEdge = true
    }
  }

  return Array.from(distances.entries())
}
