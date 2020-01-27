import { random } from '../../../utils/random'
import { not } from '../../../utils/function/not'
import { pa } from '../../../utils/function/partial'
import { head } from '../../../utils/array/head'
import { concat } from '../../../utils/iterator/concat'
import { every } from '../../../utils/iterator/every'
import { Point } from './point'
import { Actor } from './actor'
import { Renderer } from './renderer'
import { Game } from './game'

export class Food extends Point implements Actor {
  private readonly notColliding = not(pa(Point.equal, this))

  constructor(readonly game: Game) {
    super(0, 0)

    this.reposition()
  }

  update(_time: number): void {
    if (this.gotEatenByPlayer()) {
      this.game.player.grow()
      this.reposition()
    }
  }

  draw(renderer: Renderer) {
    renderer.drawFood(this)
  }

  private reposition() {
    do {
      this.x = random(0, this.game.columns - 1)
      this.y = random(0, this.game.rows - 1)
    } while (!this.isValid())
  }

  private gotEatenByPlayer() {
    return Point.equal(this, head(this.game.player))
  }

  private isValid(): boolean {
    return every(
      concat(this.game.player.tail, this.game.level.walls),
      this.notColliding
    )
  }
}
