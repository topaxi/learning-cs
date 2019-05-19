import { noop } from '../../utils/function/noop'
import { returnTrue } from '../../utils/function/constant'
import { HashSet } from '../../data-structures/hash/hash-set'
import { Queue } from '../../data-structures/queue/queue'
import { GraphVertex } from '../../data-structures/graph/graph-vertex'
import { filter } from '../../utils/iterator/filter'

export interface BreadthFirstSearchCallbacks<T> {
  find?(currentVertex: GraphVertex<T>): boolean | unknown

  enterVertex?(currentVertex: GraphVertex<T>): unknown

  leaveVertex?(currentVertex: GraphVertex<T>): unknown

  canVisitVertex?(
    currentVertex: GraphVertex<T>,
    nextVertex: GraphVertex<T>
  ): boolean
}

export function breadthFirstSearch<T>(
  startVertex: GraphVertex<T>,
  {
    find = noop,
    enterVertex = noop,
    leaveVertex = noop,
    canVisitVertex = returnTrue
  }: BreadthFirstSearchCallbacks<T>,
  visited = new HashSet<GraphVertex<T>>()
): GraphVertex<T> | undefined {
  let queue = Queue.of(startVertex)

  for (let currentVertex of queue.consume()) {
    if (visited.has(currentVertex)) continue

    visited.add(currentVertex)
    enterVertex(currentVertex)

    if (find(currentVertex) === true) {
      return currentVertex
    }

    queue.enqueue(
      ...filter(
        currentVertex.getNeighbors(),
        neighborVertex =>
          !visited.has(neighborVertex) &&
          canVisitVertex(currentVertex, neighborVertex)
      )
    )

    leaveVertex(currentVertex)
  }
}
