import { GraphEdge } from './graph-edge'
import { HashMap } from '../hash/hash-map'
import { iter } from '../../utils'

export class GraphVertex<T> {
  private static nextId = 0

  readonly id = GraphVertex.nextId++

  private readonly edges = new HashMap<number, GraphEdge<T>>()

  constructor(public value: T) {}

  get degree(): number {
    return this.edges.size
  }

  connect(vertex: GraphVertex<T>, weight?: number): this {
    this.addEdge(new GraphEdge(this, vertex, weight))
    return this
  }

  addEdge(edge: GraphEdge<T>): void {
    this.edges.set(edge.id, edge)
  }

  deleteEdge(edge: GraphEdge<T>): void {
    this.edges.delete(edge.id)
  }

  hasEdge(edge: GraphEdge<T>): boolean {
    return this.edges.has(edge.id)
  }

  getNeighbors(): IterableIterator<GraphVertex<T>> {
    return iter.map(this.getEdges(), this.normalizeNeighbors, this)
  }

  getEdges(): IterableIterator<GraphEdge<T>> {
    return this.edges.values()
  }

  toString(): string {
    return String(this.value)
  }

  toJSON() {
    return {
      value: this.value,
      edges: Array.from(this.edges.values())
    }
  }

  private normalizeNeighbors<T>(
    this: GraphVertex<T>,
    { startVertex, endVertex }: GraphEdge<T>
  ): GraphVertex<T> {
    return startVertex === this ? endVertex : startVertex
  }
}
