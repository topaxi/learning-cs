import { constant } from '../../../utils/function/constant'
import { Loop } from '../../game-utils/loop'
import { Renderer } from './renderer'
import { Piece, MoveDirection } from './piece'

const enum Action {
  moveLeft,
  moveRight,
  rotatePiece,
  dropPiece
}

export class Game {
  static start() {
    let game = new this()
    ;(window as any).currentGame = game
    document.body.addEventListener('keydown', game, true)
    document.body.addEventListener('touchend', game, true)
    game.element.addEventListener('click', game, true)
    game.element.append(game.canvas)
    document.body.append(game.element)
    game.draw()
    return game
  }

  readonly width = 10
  readonly height = 20
  readonly element = document.createElement('t-tetris')
  readonly canvas = Object.assign(document.createElement('canvas'), {
    width: this.width * 10 + 100,
    height: this.height * 10
  })
  private readonly renderer = new Renderer(this.canvas.getContext('2d')!)
  private readonly loop = new Loop(this, this.update, this.draw)
  private readonly actions: Action[] = []
  private currentPiece = Piece.random(this)
  private nextPiece = Piece.random(this)
  private readonly dropSpeed = { start: 600, decrement: 5, min: 100 }
  private rows = 0
  blocks = this.initBlocks()

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

  private initBlocks(): Array<Piece | null> {
    return Array.from({ length: this.width * this.height }, constant(null))
  }

  get step() {
    return Math.max(
      this.dropSpeed.min,
      this.dropSpeed.start - this.dropSpeed.decrement * this.rows
    )
  }

  createNextPiece() {
    this.currentPiece = this.nextPiece
    this.nextPiece = Piece.random(this)
  }

  handleEvent(event: KeyboardEvent): void {
    switch (event.type) {
      case 'keydown':
        return this.handleKeyDown(event)
    }
  }

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
        this.actions.push(Action.dropPiece)
        break
      case 'd':
      case 'ArrowRight':
        this.actions.push(Action.moveRight)
        break
      case ' ':
        this.start()
        break
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
