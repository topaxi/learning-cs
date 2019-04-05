import { GraphEdge, GraphVertex } from '../../data-structures/graph'
import { HashMap } from '../../data-structures/hash'
import { range } from '../../utils/range'

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

  for (let _i of range(vertices.length - 1)) {
    for (let edge of edges) {
      if (isShorterDistance(edge)) {
        distances.set(
          edge.endVertex,
          distances.get(edge.startVertex)! + edge.weight
        )
      }
    }
  }

  for (let _i of range(vertices.length - 1)) {
    for (let edge of edges) {
      if (isShorterDistance(edge)) {
        distances.set(edge.endVertex, -Infinity)
      }
    }
  }

  return Array.from(distances.entries())
}
