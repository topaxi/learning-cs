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
        this.drawSimpleBlock(x, y, 'gray')
      } else if (block !== null) {
        this.drawBlock(x, y, block.type)
      }
    }

    this.context.strokeRect(0, 0, width * 10, height * 10 - 1)
  }

  drawPiece(piece: Piece): void {
    for (let [x, y] of piece.blocks()) {
      this.drawBlock(x, y, piece.type)
    }
  }

  drawNextPiece(piece: Piece): void {
    for (let [x, y] of piece.blocks(11, 1)) {
      this.drawBlock(x, y, piece.type)
    }
  }

  private drawSimpleBlock(x: number, y: number, color: string): void {
    this.context.fillStyle = color
    this.context.fillRect(x * 10, y * 10, 10, 10)
    this.context.strokeRect(x * 10, y * 10, 10, 10)
  }

  drawBlock(x: number, y: number, pieceType: PieceType): void {
    this.drawSimpleBlock(x, y, pieceType.color)

    if (pieceType.name === 'O') {
      this.context.strokeRect(x * 10 + 2, y * 10 + 2, 6, 6)
    }
  }

  drawScoreboard(scoreboard: Scoreboard) {
    this.context.strokeText(`Score: ${scoreboard.score}`, 120, 60)
  }
}
