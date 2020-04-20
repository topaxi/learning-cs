import { random } from '@topaxi/lcs-utils/random'
import { construct } from '@topaxi/lcs-utils/function/construct'
import { Actor } from './actor'
import { Game } from './game'
import { Renderer } from './renderer'
import { Point } from './point'

const p = construct(Point)
const a = <T>(length: number, fn: (i: number) => T): T[] =>
  Array.from({ length }, (_, i) => fn(i))

interface LevelConfig {
  player: Point
  walls: Point[]
}

const levels: LevelConfig[] = [
  { player: p(16, 9), walls: [] },
  {
    player: p(16, 9),
    walls: [...a(32, i => p(i, 0)), ...a(32, i => p(i, 17))],
  },
  {
    player: p(16, 9),
    walls: [
      ...a(32, i => p(i, 0)),
      ...a(32, i => p(i, 17)),
      ...a(18, i => p(0, i)),
      ...a(18, i => p(31, i)),
    ],
  },
  {
    player: p(4, 4),
    walls: a(16, i => p(i + 8, 8)),
  },
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
