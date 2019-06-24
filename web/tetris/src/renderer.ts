import { Renderer2d } from '../../game-utils/renderer2d'
import { Game } from './game'
import { Piece, PieceType } from './piece'
import { Scoreboard } from './scoreboard'

export class Renderer extends Renderer2d {
  drawGame({ blocks, width, height, gameOver }: Game): void {
    this.clearScreen()

    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i]
      let y = (i / width) >>> 0
      let x = i % width

      if (gameOver) {
        this.context.fillStyle = 'gray'
        this.context.fillRect(x * 10, y * 10, 10, 10)
        this.context.strokeRect(x * 10, y * 10, 10, 10)
      } else if (block !== null) {
        this.drawBlock(x, y, block.type)
      }
    }

    this.context.strokeRect(0, 0, width * 10, height * 10 - 1)
  }

  drawPiece(piece: Piece): void {
    piece.eachBlock(this.drawBlock, this)
  }

  drawNextPiece(piece: Piece): void {
    for (let [x, y] of piece.blocks()) {
      this.drawBlock(x + 11, y + 1, piece.type)
    }
  }

  drawBlock(x: number, y: number, pieceType: PieceType): void {
    this.context.fillStyle = pieceType.color
    this.context.fillRect(x * 10, y * 10, 10, 10)
    this.context.strokeRect(x * 10, y * 10, 10, 10)

    if (pieceType.name === 'O') {
      this.context.strokeRect(x * 10 + 2, y * 10 + 2, 6, 6)
    }
  }

  drawScoreboard(scoreboard: Scoreboard) {
    this.context.strokeText(`Score: ${scoreboard.score}`, 120, 60)
  }
}
