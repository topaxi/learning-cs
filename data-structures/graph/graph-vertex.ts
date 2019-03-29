import { LinkedList } from '../list'
import { GraphEdge } from './graph-edge'

export class GraphVertex<T> {
  private static nextId = 0

  readonly id = GraphVertex.nextId++
  readonly edges = new LinkedList<GraphEdge<T>>()

  constructor(public value: T) {}

  get degree(): number {
    return this.edges.size()
  }

  addEdge(edge: GraphEdge<T>): void {
    this.edges.push(edge)
  }

  deleteEdge(edge: GraphEdge<T>): void {
    this.edges.delete(edge)
  }

  hasEdge(edge: GraphEdge<T>): boolean {
    return this.edges.includes(edge)
  }

  toString(): string {
    return String(this.value)
  }
}
