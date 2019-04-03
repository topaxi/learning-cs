import { byValue, prop, sum, iter } from '../../utils'
import { HashMap } from '../hash'
import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

export abstract class Graph<T> {
  readonly vertices = new HashMap<number, GraphVertex<T>>()
  readonly edges = new HashMap<number, GraphEdge<T>>()

  get weight(): number {
    return sum(Array.from(this.edges.values(), prop('weight')))
  }

  addVertex(vertex: GraphVertex<T>): void {
    this.vertices.set(vertex.id, vertex)
  }

  addEdge(a: T, b: T, weight = 0): this {
    let vertexA = this._findVertex(a)
    let vertexB = this._findVertex(b)

    if (vertexA !== undefined && vertexB !== undefined) {
      this._addEdge(vertexA, vertexB, weight)
    }

    return this
  }

  protected _findVertex(value: T): GraphVertex<T> | undefined {
    return iter.find(this.vertices.values(), byValue(value))
  }

  protected _addEdge(
    vertexA: GraphVertex<T>,
    vertexB: GraphVertex<T>,
    weight: number
  ): void {
    let edge1 = new GraphEdge(vertexA, vertexB, weight)
    let edge2 = edge1.clone().reverse()

    this.edges.set(edge1.id, edge1)
    this.edges.set(edge2.id, edge2)
  }
}
