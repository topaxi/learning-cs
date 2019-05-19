import { GraphVertex } from './graph-vertex'
import { swap } from '../../utils/swap'
import { pick } from '../../utils/object/pick'

export class GraphEdge<T> {
  private static nextId = 0

  readonly id = GraphEdge.nextId++

  constructor(
    public startVertex: GraphVertex<T>,
    public endVertex: GraphVertex<T>,
    public weight = 0
  ) {}

  reverse(): this {
    return swap(this, 'startVertex', 'endVertex')
  }

  clone(): GraphEdge<T> {
    return new GraphEdge(this.startVertex, this.endVertex, this.weight)
  }

  toJSON(): {
    startVertex: GraphVertex<T>
    endVertex: GraphVertex<T>
    weight: number
  } {
    return pick('startVertex', 'endVertex', 'weight')(this)
  }

  toString(): string {
    return `${this.startVertex}_${this.endVertex}`
  }
}
