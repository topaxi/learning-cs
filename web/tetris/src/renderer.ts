import { Game } from './game'
import { Piece } from './piece'
import { Scoreboard } from './scoreboard'

export class Renderer {
  constructor(private readonly context: CanvasRenderingContext2D) {}

  drawGame({ canvas, blocks, width, height }: Game): void {
    this.context.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i]

      if (block !== null) {
        let y = (i / width) >>> 0
        let x = i % width

        this.drawBlock(x, y, block.type.color)
      }
    }

    this.context.strokeRect(0, 0, width * 10 - 1, height * 10 - 1)
  }

  drawPiece(piece: Piece): void {
    piece.eachBlock(this.drawBlock, this)
  }

  drawNextPiece(piece: Piece): void {
    for (let [x, y] of piece.blocks()) {
      this.drawBlock(x + 11, y + 1, piece.type.color)
    }
  }

  drawBlock(x: number, y: number, color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(x * 10, y * 10, 10, 10)
    this.context.strokeRect(x * 10, y * 10, 10, 10)
  }

  drawScoreboard(scoreboard: Scoreboard) {
    this.context.strokeText(`Score: ${scoreboard.score}`, 120, 60)
  }
}
