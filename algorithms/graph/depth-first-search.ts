import { noop } from '../../utils/function/noop'
import { returnFalse, returnTrue } from '../../utils/function/constant'
import { HashSet } from '../../data-structures/hash/hash-set'
import { GraphVertex } from '../../data-structures/graph/graph-vertex'

export interface DepthFirstSearchCallbacks<T> {
  find?(
    currentVertex: GraphVertex<T>,
    previousVertex: GraphVertex<T> | null
  ): boolean

  enterVertex?(
    currentVertex: GraphVertex<T>,
    previousVertex: GraphVertex<T> | null
  ): unknown

  leaveVertex?(
    currentVertex: GraphVertex<T>,
    previousVertex: GraphVertex<T> | null
  ): unknown

  canVisitVertex?(
    currentVertex: GraphVertex<T>,
    nextVertex: GraphVertex<T>
  ): boolean
}

export function depthFirstSearch<T>(
  startVertex: GraphVertex<T>,
  {
    find = returnFalse,
    enterVertex = noop,
    leaveVertex = noop,
    canVisitVertex = returnTrue,
  }: DepthFirstSearchCallbacks<T>,
  visited = new HashSet<number>()
): GraphVertex<T> | undefined {
  function depthFirstSearchR(
    currentVertex: GraphVertex<T>,
    previousVertex: GraphVertex<T> | null
  ): GraphVertex<T> | undefined {
    if (visited.has(currentVertex.id)) return

    visited.add(currentVertex.id)
    enterVertex(currentVertex, previousVertex)

    if (find(currentVertex, previousVertex) === true) {
      return currentVertex
    }

    for (let nextVertex of currentVertex.getNeighbors()) {
      if (canVisitVertex(currentVertex, nextVertex)) {
        let result = depthFirstSearchR(nextVertex, currentVertex)

        if (result !== undefined) return result
      }
    }

    leaveVertex(currentVertex, previousVertex)
  }

  return depthFirstSearchR(startVertex, null)
}
