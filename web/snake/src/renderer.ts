import { head } from '../../../utils/array/head'
import { skip } from '../../../utils/iterator/skip'
import { Renderer2d } from '../../game-utils/renderer2d'
import { Player } from './player'
import { Point } from './point'
import { Game } from './game'
import { Level } from './level'
import { Food } from './food'

const snakeHead = `
  1111111111
  1111111111
  1111111111
  1111111111
  1100011111
  1001001111
  0000000011
  0000000001
  0000000001
  1111111111
`
  .replace(/\s/gs, '')
  .split('')
  .map(Number)

function imageDataToCanvas(imageData: ImageData) {
  const canvas = document.createElement('canvas')

  canvas.width = imageData.width
  canvas.height = imageData.height

  const context = canvas.getContext('2d')!

  context.putImageData(imageData, 0, 0)

  return canvas
}

export class Renderer extends Renderer2d {
  snakeHead = imageDataToCanvas(
    snakeHead.reduce((imageData: ImageData, pixel, i) => {
      imageData.data[i * 4] = 0
      imageData.data[i * 4 + 1] = 0
      imageData.data[i * 4 + 2] = 0
      imageData.data[i * 4 + 3] = pixel === 1 ? 0 : 255

      return imageData
    }, this.context.createImageData(10, 10))
  )

  drawGame(game: Game): void {
    this.clearScreen()

    game.level.draw(this)
    game.player.draw(this)
    game.food.draw(this)
  }

  private fillTile(x: number, y: number): void {
    this.context.fillRect(x * 10, y * 10, 10, 10)
  }

  drawLevel(level: Level): void {
    for (let { x, y } of level.walls) {
      this.fillTile(x, y)
    }
  }

  drawPlayer(player: Player): void {
    this.drawPlayerHead(player)
    this.drawPlayerTail(player)
  }

  private drawPlayerHead(player: Player): void {
    this.withContext(context => {
      let { x, y } = head(player)

      if (!player.alive) {
        context.fillStyle = '#ff0000'
        context.globalCompositeOperation = 'destination-in'
      }

      context.drawImage(this.snakeHead, x * 10, y * 10)
    })
  }

  private drawPlayerTail(player: Player): void {
    for (let tail of skip(player.tail, 1)) {
      this.drawPlayerTailPart(tail)
    }
  }

  private drawPlayerTailPart({ x, y }: Point): void {
    this.context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
  }

  drawFood({ x, y }: Food): void {
    this.context.fillRect(x * 10 + 3, y * 10 + 3, 4, 4)
  }
}
