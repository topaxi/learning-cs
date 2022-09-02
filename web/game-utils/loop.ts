export interface LoopOptions {
  tickRate?: number
  maxFrameSkip?: number
}

const ONE_SECONDS_MS = 1000

export class Loop<T> {
  private nextGameTick = 0
  private animationFrame = 0
  private lastUpdate = 0
  private lastFrame = 0

  private readonly tickRate: number
  private readonly skipTicks: number
  private readonly maxFrameSkip: number

  get running(): boolean {
    return this.animationFrame !== 0
  }

  constructor(
    private readonly context: T,
    private readonly update: (this: T, lastUpdateDelta: number) => void,
    private readonly render: (this: T, lastFrameDelta: number) => void,
    { tickRate = 30, maxFrameSkip = 10 }: LoopOptions = {}
  ) {
    this.tickRate = tickRate
    this.maxFrameSkip = maxFrameSkip
    this.skipTicks = ONE_SECONDS_MS / this.tickRate
  }

  private schedule() {
    this.animationFrame = requestAnimationFrame(this.loop)
  }

  private loop = (_t: number) => {
    const t = _t >>> 0
    let loops = 0

    while (t > this.nextGameTick && loops++ < this.maxFrameSkip) {
      this.update.call(this.context, t - this.lastUpdate)
      this.lastUpdate = t
      this.nextGameTick += this.skipTicks
    }

    this.render.call(this.context, t - this.lastFrame)
    this.lastFrame = t
    this.schedule()
  }

  start(): void {
    if (this.running) return

    this.nextGameTick = this.lastUpdate = this.lastFrame =
      performance.now() >>> 0
    this.schedule()
  }

  stop(): void {
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = 0
  }
}
