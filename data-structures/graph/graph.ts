import { HashMap } from '../hash/hash-map'
import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

export abstract class Graph<T> {
  readonly vertices = new HashMap<GraphVertex<T>>()
  readonly edges = new HashMap<GraphEdge<T>>()

  get weight(): number {
    return this.edges.values().reduce(weightReducer, 0)
  }

  addVertex(vertex: GraphVertex<T>): void {
    this.vertices.set(vertex.toString(), vertex)
  }

  addEdge(a: T, b: T, weight = 0): this {
    let keyA = String(a)
    let keyB = String(b)

    if (this.vertices.has(keyA) && this.vertices.has(keyB)) {
      this._addEdge(this.vertices.get(keyA)!, this.vertices.get(keyB)!, weight)
    }

    return this
  }

  protected _addEdge(
    vertexA: GraphVertex<T>,
    vertexB: GraphVertex<T>,
    weight: number
  ): void {
    let edge1 = new GraphEdge(vertexA, vertexB, weight)
    let edge2 = edge1.clone().reverse()

    this.edges.set(edge1.toString(), edge1)
    this.edges.set(edge2.toString(), edge2)
  }
}

function weightReducer(weight: number, edge: GraphEdge<any>): number {
  return weight + edge.weight
}
