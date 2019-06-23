export class Renderer2d {
  protected readonly context = this.canvas.getContext('2d')!

  constructor(protected readonly canvas: HTMLCanvasElement) {}

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
