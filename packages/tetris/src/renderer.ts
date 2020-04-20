import { Renderer2d } from '@topaxi/lcs-game-utils/renderer2d'
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

    const { context } = this

    switch (pieceType.name) {
      case 'O':
        context.strokeRect(x * 10 + 2, y * 10 + 2, 6, 6)
        return
      case 'Z':
        context.strokeRect(x * 10 + 4, y * 10 + 4, 2, 2)
        context.strokeRect(x * 10 + 5, y * 10 + 5, 1, 1)
        return
      case 'J':
      case 'S':
        context.fillStyle = 'white'
        context.fillRect(x * 10 + 3, y * 10 + 3, 4, 4)
        context.strokeRect(x * 10 + 3, y * 10 + 3, 4, 4)
        return
      case 'T':
        return this.drawTPieceBlockTexture(x, y)
    }
  }

  private drawTPieceBlockTexture(x: number, y: number): void {
    const { context } = this

    context.strokeRect(x * 10 + 3, y * 10 + 3, 4, 4)

    context.strokeStyle = 'magenta'
    context.beginPath()
    context.moveTo(x * 10 + 3, y * 10 + 3)
    context.lineTo(x * 10 + 3, y * 10 + 3 + 3)
    context.stroke()

    context.moveTo(x * 10 + 3, y * 10 + 3)
    context.lineTo(x * 10 + 3 + 3, y * 10 + 3)
    context.stroke()
    context.closePath()
    context.strokeStyle = 'black'
  }

  drawScoreboard(scoreboard: Scoreboard): void {
    this.context.strokeText(`Score: ${scoreboard.score}`, 120, 60)
    this.context.strokeText(`Rows: ${scoreboard.rows}`, 120, 76)
  }
}
