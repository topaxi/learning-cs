import { GraphVertex } from './graph-vertex'

export class GraphEdge<T> {
  constructor(
    public startVertex: GraphVertex<T>,
    public endVertex: GraphVertex<T>,
    public weight = 0
  ) {}

  reverse(): this {
    ;[this.startVertex, this.endVertex] = [this.endVertex, this.startVertex]

    return this
  }

  clone(): GraphEdge<T> {
    return new GraphEdge(this.startVertex, this.endVertex, this.weight)
  }

  toString(): string {
    return `${this.startVertex}_${this.endVertex}`
  }
}