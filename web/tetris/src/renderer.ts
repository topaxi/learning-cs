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

  drawPiece(piece: Piece, column = piece.x, row = piece.y): void {
    for (let [x, y] of piece.blocks(column, row)) {
      this.drawBlock(x, y, piece.type)
    }
  }

  drawNextPiece(piece: Piece): void {
    this.drawPiece(piece, 11, 1)
  }

  private drawSimpleBlock(x: number, y: number, color: string): void {
    let rectX = x * 10
    let rectY = y * 10

    this.context.fillStyle = color
    this.context.fillRect(rectX, rectY, 10, 10)
    this.context.strokeRect(rectX, rectY, 10, 10)
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
