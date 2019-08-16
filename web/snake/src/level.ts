import { random } from '../../../utils/random'
import { Actor } from './actor'
import { Game } from './game'
import { Renderer } from './renderer'
import { Point } from './point'

function p(x: number, y: number) {
  return new Point(x, y)
}

interface LevelConfig {
  player: Point
  walls: Point[]
}

const levels: LevelConfig[] = [
  { player: p(16, 9), walls: [] },
  {
    player: p(16, 9),
    walls: [
      ...Array.from({ length: 32 }).map((_, i) => p(i, 0)),
      ...Array.from({ length: 32 }).map((_, i) => p(i, 17))
    ]
  },
  {
    player: p(16, 9),
    walls: [
      ...Array.from({ length: 32 }).map((_, i) => p(i, 0)),
      ...Array.from({ length: 32 }).map((_, i) => p(i, 17)),
      ...Array.from({ length: 18 }).map((_, i) => p(0, i)),
      ...Array.from({ length: 18 }).map((_, i) => p(31, i))
    ]
  },
  {
    player: p(4, 4),
    walls: [
      p(8, 8),
      p(9, 8),
      p(10, 8),
      p(11, 8),
      p(12, 8),
      p(13, 8),
      p(14, 8),
      p(15, 8),
      p(16, 8),
      p(17, 8),
      p(18, 8),
      p(19, 8),
      p(20, 8),
      p(21, 8),
      p(22, 8),
      p(23, 8)
    ]
  }
]

export class Level implements Actor, LevelConfig {
  player!: Point
  walls!: Point[]

  constructor(readonly game: Game) {
    Object.assign(this, levels[random(0, levels.length - 1)])
  }

  // eslint-disable-next-line
  update(_time: number): void {}

  draw(renderer: Renderer): void {
    renderer.drawLevel(this)
  }
}
