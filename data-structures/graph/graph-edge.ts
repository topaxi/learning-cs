import { GraphVertex } from './graph-vertex'

export class GraphEdge<T> {
  constructor(
    public startVertex: GraphVertex<T>,
    public endVertex: GraphVertex<T>,
    public weight = 0
  ) {}

  reverse(): void {
    ;[this.startVertex, this.endVertex] = [this.endVertex, this.startVertex]
  }

  toString(): string {
    return `${this.startVertex}_${this.endVertex}`
  }
}
