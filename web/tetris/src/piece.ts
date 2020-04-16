import { range } from '../../../utils/range'
import { shuffle, shuffleInplace } from '../../../utils/array/shuffle'
import { flatMap } from '../../../utils/iterator/flat-map'
import { some } from '../../../utils/iterator/some'
import { constant } from '../../../utils/function/constant'
import { Renderer } from './renderer'
import { Game } from './game'

export const enum MoveDirection {
  left,
  right,
  down,
}

export const enum Rotation {
  up = 0,
  right = 1,
  down = 2,
  left = 3,
}

export interface PieceType {
  name: 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'
  color: string
  initialPositionOffset: { x: number; y: number }
  [Rotation.up]: number
  [Rotation.down]: number
  [Rotation.left]: number
  [Rotation.right]: number
}

const I: PieceType = {
  name: 'I',
  color: 'cyan',
  initialPositionOffset: { x: 0, y: 0 },
  [Rotation.up]: 0x0f00,
  [Rotation.down]: 0x2222,
  [Rotation.left]: 0x00f0,
  [Rotation.right]: 0x4444,
}
const J: PieceType = {
  name: 'J',
  color: 'blue',
  initialPositionOffset: { x: 1, y: 0 },
  [Rotation.up]: 0x44c0,
  [Rotation.down]: 0x8e00,
  [Rotation.left]: 0x6440,
  [Rotation.right]: 0x0e20,
}
const L: PieceType = {
  name: 'L',
  color: 'orange',
  initialPositionOffset: { x: 0, y: 0 },
  [Rotation.up]: 0x4460,
  [Rotation.down]: 0x0e80,
  [Rotation.left]: 0xc440,
  [Rotation.right]: 0x2e00,
}
const O: PieceType = {
  name: 'O',
  color: 'yellow',
  initialPositionOffset: { x: 1, y: 1 },
  [Rotation.up]: 0xcc00,
  [Rotation.down]: 0xcc00,
  [Rotation.left]: 0xcc00,
  [Rotation.right]: 0xcc00,
}
const S: PieceType = {
  name: 'S',
  color: 'lime',
  initialPositionOffset: { x: 0, y: 0 },
  [Rotation.up]: 0x06c0,
  [Rotation.down]: 0x8c40,
  [Rotation.left]: 0x6c00,
  [Rotation.right]: 0x4620,
}
const T: PieceType = {
  name: 'T',
  color: 'purple',
  initialPositionOffset: { x: 0, y: 0 },
  [Rotation.up]: 0x0e40,
  [Rotation.down]: 0x4c40,
  [Rotation.left]: 0x4e00,
  [Rotation.right]: 0x4640,
}
const Z: PieceType = {
  name: 'Z',
  color: 'red',
  initialPositionOffset: { x: 0, y: 0 },
  [Rotation.up]: 0x0c60,
  [Rotation.down]: 0x4c80,
  [Rotation.left]: 0xc600,
  [Rotation.right]: 0x2640,
}

const PIECES = { I, J, L, O, S, T, Z }

export class Piece {
  static create(game: Game, pieceType: PieceType['name']): Piece {
    return new this(game, PIECES[pieceType])
  }

  /**
   * Newer tetris implementations use this pseudo random implementation
   * of pieces where it is not possible to have more than 4 consecutive
   * pieces of the same type.
   * This causes the game to be played more reliable.
   */
  private static seedPieces() {
    return shuffleInplace(
      shuffle(flatMap(range(4), constant(Object.keys(PIECES))))
    ) as PieceType['name'][]
  }

  private static pieces = Piece.seedPieces()

  static random(game: Game): Piece {
    if (this.pieces.length === 0) this.pieces = this.seedPieces()
    return this.create(game, this.pieces.shift()!)
  }

  x = this.game.width / 2 - 2 + this.type.initialPositionOffset.x
  y = this.type.initialPositionOffset.y
  rotation = Rotation.up
  private lastMove = 0

  private constructor(private readonly game: Game, readonly type: PieceType) {}

  rotate(): void {
    let rotation = (this.rotation + 1) % 4

    if (!this.occupied(this.x, this.y, rotation)) {
      this.rotation = rotation
    }
  }

  /**
   * Tetris block layout by https://codeincomplete.com/posts/javascript-tetris/
   */
  *blocks(
    x = this.x,
    y = this.y,
    rotation = this.rotation
  ): IterableIterator<[number, number]> {
    for (let bit = 0x8000, row = 0, col = 0; bit !== 0; bit >>= 1) {
      if ((this.type[rotation] & bit) !== 0) {
        yield [x + col, y + row]
      }

      if (++col === 4) {
        col = 0
        row++
      }
    }
  }

  occupied(x = this.x, y = this.y, rotation = this.rotation): boolean {
    return some(this.blocks(x, y, rotation), this._gameHasBlock, this)
  }

  private _gameHasBlock([x, y]: [number, number]): boolean {
    return this.game.hasBlock(x, y)
  }

  move(direction: number): boolean {
    let { x, y } = this

    switch (direction) {
      case MoveDirection.left:
        x = x - 1
        break
      case MoveDirection.right:
        x = x + 1
        break
      case MoveDirection.down:
        y = y + 1
        break
    }

    if (this.occupied(x, y)) {
      return false
    }

    this.x = x
    this.y = y

    return true
  }

  update(time: number): void {
    this.lastMove += time

    if (this.lastMove > this.game.step) {
      this.lastMove = 0
      this.drop()
    }
  }

  drop(): boolean {
    if (this.move(MoveDirection.down)) {
      return true
    }

    for (let [x, y] of this.blocks()) {
      this.game.setBlock(x, y, this)
    }

    this.game.removeRows()
    this.game.createNextPiece()

    return false
  }

  draw(renderer: Renderer) {
    renderer.drawPiece(this)
  }
}
