import { GraphEdge, GraphVertex } from '../../data-structures/graph'
import { HashMap } from '../../data-structures/hash'
import { iter } from '../../utils'

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
    i < vertices.length - 1 && didRelaxEdge;
    i++
  ) {
    didRelaxEdge = false
    for (let edge of iter.filter(edges, isShorterDistance)) {
      distances.set(
        edge.endVertex,
        distances.get(edge.startVertex)! + edge.weight
      )
      didRelaxEdge = true
    }
  }

  for (
    let i = 0, didRelaxEdge = true;
    i < vertices.length - 1 && didRelaxEdge;
    i++
  ) {
    didRelaxEdge = false
    for (let edge of iter.filter(edges, isShorterDistance)) {
      distances.set(edge.endVertex, -Infinity)
      didRelaxEdge = true
    }
  }

  return Array.from(distances.entries())
}
