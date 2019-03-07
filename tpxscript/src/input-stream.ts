export class InputStream {
  private pos = 0
  private line = 1
  private col = 0

  constructor(private input: string) {}

  next(): string {
    let ch = this.input.charAt(this.pos++)

    if (ch === '\n') {
      this.line++
      this.col = 0
    } else {
      this.col++
    }

    return ch
  }

  peek(): string {
    return this.input.charAt(this.pos)
  }

  eof(): boolean {
    return this.peek() === ''
  }

  croak(msg: string): never {
    throw new Error(`${msg} (${this.line}:${this.col})`)
  }
}
