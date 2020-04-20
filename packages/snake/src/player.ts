import { head, Head } from '@topaxi/lcs-utils/array/head'
import { pa } from '@topaxi/lcs-utils/function/partial'
import { concat } from '@topaxi/lcs-utils/iterator/concat'
import { skip } from '@topaxi/lcs-utils/iterator/skip'
import { some } from '@topaxi/lcs-utils/iterator/some'
import { Renderer } from './renderer'
import { Actor } from './actor'
import { Point } from './point'
import { Game } from './game'

export enum Direction {
  up,
  down,
  left,
  right,
}

export class Player implements Actor, Head<Point> {
  tail: Point[] = []
  alive = true

  get 0() {
    return head(this.tail)!
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
    let collidables = concat(skip(this.tail, 1), this.game.level.walls)

    if (some(collidables, colliding)) {
      this.alive = false
    }
  }

  draw(renderer: Renderer): void {
    renderer.drawPlayer(this)
  }
}
