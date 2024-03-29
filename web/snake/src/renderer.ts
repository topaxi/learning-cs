import { head } from '../../../utils/array/head'
import { Renderer2d } from '../../game-utils/renderer2d'
import { Player } from './player'
import { Point } from './point'
import { Game } from './game'
import { Level } from './level'
import { Food } from './food'

export class Renderer extends Renderer2d {
  drawGame(_game: Game): void {
    this.clearScreen()
  }

  drawLevel(level: Level): void {
    for (let i = 0; i < level.walls.length; i++) {
      this.drawWallPiece(level.walls[i])
    }
  }

  private drawWallPiece({ x, y }: Point): void {
    this.context.fillRect(x * 10, y * 10, 10, 10)
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
