import { GraphEdge } from './graph-edge'
import { HashSet } from '../hash/hash-set'
import { map } from '../../utils/iterator/map'

export class GraphVertex<T> {
  private static nextId = 0

  readonly id = GraphVertex.nextId++

  private readonly edges = new HashSet<GraphEdge<T>>()

  constructor(public value: T) {}

  get degree(): number {
    return this.edges.size
  }

  connect(vertex: GraphVertex<T>, weight?: number): this {
    this.addEdge(new GraphEdge(this, vertex, weight))
    return this
  }

  addEdge(edge: GraphEdge<T>): void {
    this.edges.add(edge)
  }

  deleteEdge(edge: GraphEdge<T>): void {
    this.edges.delete(edge)
  }

  hasEdge(edge: GraphEdge<T>): boolean {
    return this.edges.has(edge)
  }

  getNeighbors(): IterableIterator<GraphVertex<T>> {
    return map(this.getEdges(), this.normalizeNeighbors, this)
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
      edges: this.edges
    }
  }

  private normalizeNeighbors<T>(
    this: GraphVertex<T>,
    { startVertex, endVertex }: GraphEdge<T>
  ): GraphVertex<T> {
    return startVertex === this ? endVertex : startVertex
  }
}
