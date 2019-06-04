import { head } from '../../../utils/array/head'
import { Player } from './player'
import { Point } from './point'
import { Game } from './game'
import { Level } from './level'
import { Food } from './food'

export class Renderer {
  constructor(private readonly context: CanvasRenderingContext2D) {}

  drawGame({ canvas }: Game): void {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
  }

  drawLevel(level: Level): void {
    for (let i = 0; i < level.walls.length; i++) {
      this.context.fillRect(
        level.walls[i].x * 10,
        level.walls[i].y * 10,
        10,
        10
      )
    }
  }

  drawPlayer(player: Player): void {
    for (let i = 0; i < player.tail.length; i++) {
      this.drawPlayerBodyPart(player.tail[i])
    }

    if (!player.alive) {
      this.context.fillStyle = '#ff0000'
      this.drawPlayerBodyPart(head(player))
      this.context.fillStyle = '#000000'
    }
  }

  private drawPlayerBodyPart({ x, y }: Point): void {
    this.context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
  }

  drawFood({ x, y }: Food): void {
    this.context.fillRect(x * 10 + 3, y * 10 + 3, 4, 4)
  }
}
