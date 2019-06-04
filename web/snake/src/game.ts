import { noop } from '../../../utils/function/noop'
import { Loop } from './loop'
import { Player, Direction } from './player'
import { Renderer } from './renderer'
import { Food } from './food'
import { Point } from './point'
import { Actor } from './actor'
import { Level } from './level'

const { floor } = Math

export class Game implements Actor {
  static start() {
    let game = new this(32, 18)
    ;(window as any).currentGame = game
    document.body.addEventListener('keydown', game, true)
    document.body.append(game.canvas)
    game.draw()
    return game
  }

  private readonly loop = new Loop(this, this.update, this.draw, {
    tickRate: 10
  })

  canvas = document.createElement('canvas')
  private renderer = new Renderer(this.canvas.getContext('2d')!)
  private userInput = noop

  level = new Level(this)
  player = new Player(this)
  food = new Food(this)

  private constructor(readonly columns: number, readonly rows: number) {
    this.canvas.width = columns * 10
    this.canvas.height = rows * 10
  }

  handleEvent(e: KeyboardEvent) {
    switch (e.type) {
      case 'keydown':
        return this.handleKeyDown(e)
    }
  }

  private handlePlayerKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        this.userInput = () => (this.player.direction = Direction.up)
        break
      case 'a':
      case 'ArrowLeft':
        this.userInput = () => (this.player.direction = Direction.left)
        break
      case 's':
      case 'ArrowDown':
        this.userInput = () => (this.player.direction = Direction.down)
        break
      case 'd':
      case 'ArrowRight':
        this.userInput = () => (this.player.direction = Direction.right)
        break
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.loop.running) {
      this.handlePlayerKeyDown(e)
    }

    switch (e.key) {
      case ' ':
        if (this.loop.running) {
          this.loop.stop()
        } else {
          this.loop.start()
        }
        break
      default:
        return
    }

    e.preventDefault()
  }

  private handleUserInput() {
    this.userInput()
    this.userInput = noop
  }

  update(_time: number) {
    this.handleUserInput()
    this.level.update(_time)
    this.player.update(_time)
    this.food.update(_time)
  }

  draw() {
    this.renderer.drawGame(this)
    this.level.draw(this.renderer)
    this.player.draw(this.renderer)
    this.food.draw(this.renderer)
  }

  start() {
    this.loop.start()
    return this
  }

  stop() {
    this.loop.stop()
    return this
  }
}

Game.start()
