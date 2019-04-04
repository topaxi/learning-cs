import { HashSet } from '../../data-structures/hash'
import { Queue } from '../../data-structures/queue'
import { GraphVertex } from '../../data-structures/graph'
import { noop, returnTrue } from '../../utils'

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
  visited = new HashSet<number>()
): GraphVertex<T> | undefined {
  let queue = Queue.of(startVertex)

  for (let currentVertex of queue.consume()) {
    if (visited.has(currentVertex.id)) return

    visited.add(currentVertex.id)
    enterVertex(currentVertex)

    if (find(currentVertex) === true) {
      return currentVertex
    }

    for (let neighborVertex of currentVertex.getNeighbors()) {
      if (
        !visited.has(neighborVertex.id) &&
        canVisitVertex(currentVertex, neighborVertex)
      ) {
        queue.enqueue(neighborVertex)
      }
    }

    leaveVertex(currentVertex)
  }
}
