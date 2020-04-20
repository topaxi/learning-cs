import { Renderer } from './renderer'

export interface Actor {
  update(...args: any[]): void
  draw(renderer: Renderer): void
}
