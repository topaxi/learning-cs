import { Graph } from './graph'
import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

export class DirectedGraph<T> extends Graph<T> {
  protected override _addEdge(
    vertexA: GraphVertex<T>,
    vertexB: GraphVertex<T>,
    weight: number
  ): void {
    let edge = new GraphEdge(vertexA, vertexB, weight)

    this.edges.set(edge.id, edge)
  }
}
