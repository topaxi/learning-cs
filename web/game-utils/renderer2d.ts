export class Renderer2d {
  protected readonly context: Readonly<
    CanvasRenderingContext2D
  > = this.canvas.getContext('2d')!

  constructor(protected readonly canvas: HTMLCanvasElement) {
    this.context.translate(0.5, 0.5)
  }

  protected withContext<T>(
    callback: (context: CanvasRenderingContext2D) => T
  ): T {
    this.context.save()

    let ret = callback(this.context)

    this.context.restore()

    return ret
  }

  protected clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
