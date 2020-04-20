import { lastIndex } from '@topaxi/lcs-utils/array/last-index'
import { filter } from '@topaxi/lcs-utils/iterator/filter'
import { HashMap } from '@topaxi/lcs-data-structures/hash/hash-map'
import { GraphEdge } from '@topaxi/lcs-data-structures/graph/graph-edge'
import { GraphVertex } from '@topaxi/lcs-data-structures/graph/graph-vertex'

function* relax<T>(
  vertices: readonly GraphVertex<T>[],
  edges: () => Iterable<GraphEdge<T>>
) {
  for (
    let i = 0, didRelaxEdge = true;
    i < lastIndex(vertices) && didRelaxEdge;
    i++
  ) {
    didRelaxEdge = false

    for (let edge of edges()) {
      yield edge
      didRelaxEdge = true
    }
  }
}

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

  const getShorterEdges = () => filter(edges, isShorterDistance)

  for (let edge of relax(vertices, getShorterEdges)) {
    distances.set(
      edge.endVertex,
      distances.get(edge.startVertex)! + edge.weight
    )
  }

  for (let edge of relax(vertices, getShorterEdges)) {
    distances.set(edge.endVertex, -Infinity)
  }

  return Array.from(distances.entries())
}
