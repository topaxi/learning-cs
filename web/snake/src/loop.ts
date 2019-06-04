export interface LoopOptions {
  tickRate?: number
  maxFrameSkip?: number
}

const ONE_SECONDS_MS = 1000

export class Loop<T> {
  private loops = 0
  private nextGameTick = 0
  private animationFrame = 0

  private readonly tickRate: number
  private readonly skipTicks: number
  private readonly maxFrameSkip: number

  get running() {
    return this.animationFrame !== 0
  }

  constructor(
    private readonly context: T,
    private readonly update: (this: T, t: number) => void,
    private readonly render: (this: T) => void,
    { tickRate = 30, maxFrameSkip = 10 }: LoopOptions = {}
  ) {
    this.tickRate = tickRate
    this.maxFrameSkip = maxFrameSkip

    this.skipTicks = ONE_SECONDS_MS / this.tickRate
  }

  private schedule() {
    this.animationFrame = requestAnimationFrame(this.loop)
  }

  private loop = (t: number) => {
    this.loops = 0

    while (t > this.nextGameTick && this.loops < this.maxFrameSkip) {
      this.update.call(this.context, t)
      this.nextGameTick += this.skipTicks
      this.loops++
    }

    this.render.call(this.context)
    this.schedule()
  }

  start() {
    this.nextGameTick = performance.now()
    this.schedule()
  }

  stop() {
    window.cancelAnimationFrame(this.animationFrame)
    this.animationFrame = 0
  }
}
