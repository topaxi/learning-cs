export class Renderer2d {
  protected readonly context = this.canvas.getContext('2d')!

  constructor(protected readonly canvas: HTMLCanvasElement) {
    this.context.translate(0.5, 0.5)
  }

  protected clearScreen(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
