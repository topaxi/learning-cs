import { constant } from '@topaxi/lcs-utils/function/constant'
import { Loop } from '@topaxi/lcs-game-utils/loop'
import { Renderer } from './renderer'
import { Piece, MoveDirection } from './piece'
import { Scoreboard } from './scoreboard'
import { DPad, DPadEvent, DPadDirection } from '../../game-utils/dpad'

enum Action {
  moveLeft,
  moveRight,
  moveDown,
  rotatePiece,
  dropPiece,
}

export class Game {
  static start() {
    let game = new this()
    let dpad = new DPad()
    ;(window as any).currentGame = game
    document.body.addEventListener('keydown', game, true)
    document.body.addEventListener('touchend', game, true)
    dpad.addEventListener('dpad', game, true)
    game.element.addEventListener('click', game, true)
    game.element.append(game.canvas)
    game.element.append(dpad.element)
    document.body.append(game.element)
    game.draw()
    return game
  }

  readonly width = 10
  readonly height = 20
  readonly element = document.createElement('t-tetris')
  readonly canvas = Object.assign(document.createElement('canvas'), {
    width: this.width * 10 + 100,
    height: this.height * 10,
  })
  private readonly renderer = new Renderer(this.canvas)
  private readonly loop = new Loop(this, this.update, this.draw)
  private readonly actions: Action[] = []
  private currentPiece = Piece.random(this)
  private nextPiece = Piece.random(this)
  private readonly dropSpeed = { start: 600, decrement: 5, min: 100 }
  scoreboard = new Scoreboard()
  blocks = this.initBlocks()
  gameOver = false

  getBlock(x: number, y: number) {
    return this.blocks[y * this.width + x]
  }

  setBlock(x: number, y: number, value: any): void {
    this.blocks[y * this.width + x] = value
  }

  hasBlock(x: number, y: number): boolean {
    return (
      x < 0 ||
      x >= this.width ||
      y < 0 ||
      y >= this.height ||
      this.getBlock(x, y) !== null
    )
  }

  removeRows(): void {
    let rowsRemoved = 0

    rows: for (let y = this.height - 1; y !== 0; y--) {
      for (let x = 0; x < this.width; x++) {
        if (this.getBlock(x, y) === null) {
          continue rows
        }
      }

      this.removeRow(y++)
      rowsRemoved++
    }

    this.setRemovedRowsScore(rowsRemoved)
  }

  private removeRow(n: number): void {
    for (let y = n; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        this.setBlock(x, y, y === 0 ? null : this.getBlock(x, y - 1))
      }
    }
  }

  private setRemovedRowsScore(n: number): void {
    if (n !== 0) {
      this.scoreboard.rows += n
      this.scoreboard.score = this.scoreboard.score +=
        n === 1 ? 40 : n === 2 ? 100 : n === 3 ? 300 : 1200
    }
  }

  private initBlocks(): Array<Piece | null> {
    return Array.from({ length: this.width * this.height }, constant(null))
  }

  get step() {
    return Math.max(
      this.dropSpeed.min,
      this.dropSpeed.start - this.dropSpeed.decrement * this.scoreboard.rows
    )
  }

  createNextPiece() {
    this.currentPiece = this.nextPiece
    this.nextPiece = Piece.random(this)

    if (this.currentPiece.occupied()) {
      this.gameOver = true
    }
  }

  handleEvent(event: KeyboardEvent | MouseEvent | DPadEvent): void {
    switch (event.type) {
      case 'keydown':
        return this.handleKeyDown(event as KeyboardEvent)
      case 'click':
        return void this.start()
      case 'dpad':
        return this.handleDPad(event as DPadEvent)
    }
  }

  private handleDPad(event: DPadEvent): void {
    if (!this.loop.running) {
      this.start()
    }

    switch (event.detail.direction) {
      case DPadDirection.up:
        this.actions.push(Action.rotatePiece)
        break
      case DPadDirection.left:
        this.actions.push(Action.moveLeft)
        break
      case DPadDirection.down:
        this.actions.push(Action.moveDown)
        break
      case DPadDirection.right:
        this.actions.push(Action.moveRight)
        break
    }
  }

  // eslint-disable-next-line complexity
  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        this.actions.push(Action.rotatePiece)
        break
      case 'a':
      case 'ArrowLeft':
        this.actions.push(Action.moveLeft)
        break
      case 's':
      case 'ArrowDown':
        this.actions.push(Action.moveDown)
        break
      case 'd':
      case 'ArrowRight':
        this.actions.push(Action.moveRight)
        break
      case ' ':
        this.actions.push(Action.dropPiece)
        break
    }

    if (!this.loop.running && this.actions.length !== 0) {
      this.start()
    }
  }

  private handleUserInput(): void {
    for (let action of this.actions) {
      this.handleUserAction(action)
    }

    this.actions.length = 0
  }

  private handleUserAction(action: Action): void {
    switch (action) {
      case Action.rotatePiece:
        this.currentPiece.rotate()
        break
      case Action.moveLeft:
        this.currentPiece.move(MoveDirection.left)
        break
      case Action.moveRight:
        this.currentPiece.move(MoveDirection.right)
        break
      case Action.moveDown:
        this.currentPiece.move(MoveDirection.down)
        break
      case Action.dropPiece:
        while (this.currentPiece.drop());
        break
    }
  }

  private update(time: number): void {
    this.handleUserInput()

    if (this.currentPiece !== null) {
      this.currentPiece.update(time)
    }
  }

  private draw(): void {
    this.renderer.drawGame(this)
    this.scoreboard.draw(this.renderer)

    if (this.gameOver) return void this.stop()

    if (this.currentPiece !== null) {
      this.currentPiece.draw(this.renderer)
    }

    if (this.nextPiece !== null) {
      this.renderer.drawNextPiece(this.nextPiece)
    }
  }

  start(): this {
    this.loop.start()
    return this
  }

  stop(): this {
    this.loop.stop()
    return this
  }
}

Game.start()
