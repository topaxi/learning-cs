import { filter } from '@topaxi/lcs-utils/iterator/filter'
import { GraphVertex } from '@topaxi/lcs-data-structures/graph/graph-vertex'
import { HashSet } from '@topaxi/lcs-data-structures/hash/hash-set'
import { HashMap } from '@topaxi/lcs-data-structures/hash/hash-map'
import { PriorityQueue } from '@topaxi/lcs-data-structures/queue/priority-queue'

export function dijkstra<T>(
  vertices: readonly GraphVertex<T>[],
  startVertex: GraphVertex<T>
) {
  let distances = new HashMap.withDefault<GraphVertex<T>, number>(Infinity)
  let visited = new HashSet<GraphVertex<T>>()
  let previous = new HashMap<GraphVertex<T>, GraphVertex<T> | null>()
  let queue = new PriorityQueue<GraphVertex<T>>().enqueue(startVertex)

  distances.set(startVertex, 0)

  for (let vertex of filter(queue, v => !visited.has(v))) {
    for (let edge of vertex.getEdges()) {
      if (!visited.has(edge.endVertex)) {
        queue.enqueue(edge.endVertex, Infinity)
      }

      let neighborDistance = edge.weight + distances.get(vertex)

      if (neighborDistance < distances.get(edge.endVertex)) {
        distances.set(edge.endVertex, neighborDistance)
        previous.set(edge.endVertex, vertex)
        queue.updatePriority(edge.endVertex, neighborDistance)
      }
    }

    visited.add(vertex)
  }

  return { distances, previous }
}
