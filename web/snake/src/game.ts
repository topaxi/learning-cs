import { noop } from '../../../utils/function/noop'
import { Loop } from './loop'
import { Player, Direction } from './player'
import { Renderer } from './renderer'
import { Food } from './food'
import { Actor } from './actor'
import { Level } from './level'

const buttonTexts = {
  [Direction.up]: '⬆',
  [Direction.right]: '➡',
  [Direction.down]: '⬇',
  [Direction.left]: '⬅'
}

export class Game implements Actor {
  static start() {
    let game = new this(32, 18)
    ;(window as any).currentGame = game
    document.body.addEventListener('keydown', game, true)
    document.body.addEventListener('touchend', game, true)
    game.element.addEventListener('click', game, true)
    game.element.append(game.canvas)
    game.element.append(game.createDirectionButton(Direction.up))
    game.element.append(game.createDirectionButton(Direction.right))
    game.element.append(game.createDirectionButton(Direction.down))
    game.element.append(game.createDirectionButton(Direction.left))
    document.body.append(game.element)
    game.draw()
    return game
  }

  private readonly loop = new Loop(this, this.update, this.draw, {
    tickRate: 10
  })

  element = document.createElement('t-snake')
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

  handleEvent(e: KeyboardEvent | MouseEvent | TouchEvent) {
    switch (e.type) {
      case 'keydown':
        return this.handleKeyDown(e as KeyboardEvent)
      case 'click':
        return this.handleClick(e as MouseEvent)
      case 'touchend':
        return this.handleTouch(e as TouchEvent)
    }
  }

  private handlePlayerKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        this.updatePlayerDirection(Direction.up)
        break
      case 'a':
      case 'ArrowLeft':
        this.updatePlayerDirection(Direction.left)
        break
      case 's':
      case 'ArrowDown':
        this.updatePlayerDirection(Direction.down)
        break
      case 'd':
      case 'ArrowRight':
        this.updatePlayerDirection(Direction.right)
        break
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.loop.running) {
      this.handlePlayerKeyDown(e)
    }

    switch (e.key) {
      case ' ':
        this.toggleLoop()
        break
      default:
        return
    }

    e.preventDefault()
  }

  private handleClick(e: MouseEvent) {
    switch ((e.target as any).tagName) {
      case 'CANVAS':
        this.toggleLoop()
        return
      case 'BUTTON':
        this.updatePlayerDirection(Number((e.target as any).value))
        return
    }
  }

  private handleTouch(e: TouchEvent) {
    switch ((e.target as any).tagName) {
      case 'CANVAS':
        this.toggleLoop()
        return
      case 'BUTTON':
        this.updatePlayerDirection(Number((e.target as any).value))
        return
    }
  }

  private createDirectionButton(dir: Direction) {
    let button = document.createElement('button')
    button.value = String(dir)
    button.textContent = buttonTexts[dir]
    return button
  }

  private updatePlayerDirection(dir: Direction) {
    this.setUserInput(() => (this.player.direction = dir))
  }

  private setUserInput(input: () => void) {
    this.userInput = input
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

  private toggleLoop() {
    if (this.loop.running) {
      this.loop.stop()
    } else {
      this.loop.start()
    }
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
