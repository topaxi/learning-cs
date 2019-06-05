import { head, Head } from '../../../utils/array/head'
import { pa } from '../../../utils/function/partial'
import { Renderer } from './renderer'
import { Actor } from './actor'
import { Point } from './point'
import { Game } from './game'

const { floor } = Math

export const enum Direction {
  up,
  down,
  left,
  right
}

export class Player implements Actor, Head<{ x: number; y: number }> {
  tail: Point[] = []
  alive = true

  get 0() {
    return this.tail[0]
  }

  private _direction = Direction.right

  get direction(): Direction {
    return this._direction
  }

  set direction(dir: Direction) {
    if (
      (this._direction === Direction.right && dir === Direction.left) ||
      (this._direction === Direction.left && dir === Direction.right) ||
      (this._direction === Direction.up && dir === Direction.down) ||
      (this._direction === Direction.down && dir === Direction.up)
    ) {
      return
    }

    this._direction = dir
  }

  constructor(readonly game: Game) {
    let { x, y } = game.level.player

    this.tail.push(new Point(x, y))
    this.tail.push(new Point(x - 1, y))
  }

  grow(): void {
    let { x, y } = this.tail[this.tail.length - 1]

    this.tail.push(new Point(x, y))
  }

  update(_time: number): void {
    if (!this.alive) return

    let part = Object.assign(this.tail.pop()!, head(this))

    switch (this._direction) {
      case Direction.up:
        part.y--
        if (part.y === -1) part.y = this.game.rows - 1
        break
      case Direction.right:
        part.x = (part.x + 1) % this.game.columns
        break
      case Direction.down:
        part.y = (part.y + 1) % this.game.rows
        break
      case Direction.left:
        part.x--
        if (part.x === -1) part.x = this.game.columns - 1
        break
    }

    this.tail.unshift(part)

    this.verifyAlive()
  }

  private verifyAlive(): void {
    let colliding = pa(Point.equal, head(this))

    for (let i = 1; i < this.tail.length; i++) {
      if (colliding(this.tail[i])) {
        this.alive = false
        return
      }
    }

    if (this.game.level.walls.some(colliding)) {
      this.alive = false
    }
  }

  draw(renderer: Renderer): void {
    renderer.drawPlayer(this)
  }
}
