import { byValue } from '../../utils/filters'
import { HashMap } from '../hash/hash-map'
import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

function weightReducer(weight: number, edge: GraphEdge<unknown>): number {
  return weight + edge.weight
}

export abstract class Graph<T> {
  readonly vertices = new HashMap<number, GraphVertex<T>>()
  readonly edges = new HashMap<number, GraphEdge<T>>()

  get weight(): number {
    return this.edges.values().reduce(weightReducer, 0)
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
    return this.vertices.values().find(byValue(value))
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
