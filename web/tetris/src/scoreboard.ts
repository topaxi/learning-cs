import { Renderer } from './renderer'

export class Scoreboard {
  rows = 0
  score = 0

  draw(renderer: Renderer): void {
    renderer.drawScoreboard(this)
  }
}
