export class Renderer2d {
  protected readonly context: CanvasRenderingContext2D

  constructor(protected readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d')!
    this.context.translate(0.5, 0.5)
  }

  protected clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
