import { InputStream } from '../input-stream'
import * as t from './tokens'
import w from 'w-array'

export class TokenStream {
  private current: t.Token | null = null
  private keywords = new Set(w`
    if
    then
    else
    fn
    true
    false
    and
    or
  `)

  constructor(readonly input: InputStream) {}

  isKeyword(ch: string): boolean {
    return this.keywords.has(ch)
  }

  isDigit(ch: string): boolean {
    return /\d/.test(ch)
  }

  isIdentifierStart(ch: string): boolean {
    return /[a-z_]/i.test(ch)
  }

  isIdentifier(ch: string): boolean {
    return this.isIdentifierStart(ch) || '?!-<>=0123456789'.includes(ch)
  }

  isOperatorCharacter(ch: string): boolean {
    return '+-*/%=&|<>!'.includes(ch)
  }

  isPunctuation(ch: string): boolean {
    return ',;(){}[]'.includes(ch)
  }

  isWhitespace(ch: string): boolean {
    return /\s/.test(ch)
  }

  readWhile(predicate: (this: this, ch: string) => boolean): string {
    let str = ''

    while (!this.input.eof() && predicate.call(this, this.input.peek())) {
      str = str + this.input.next()
    }

    return str
  }

  readNumber(): t.NumberToken {
    let hasDot = false
    let n = this.readWhile(ch => {
      if (ch === '.') {
        if (hasDot) return false
        hasDot = true
        return true
      }
      return this.isDigit(ch)
    })

    return { type: 'num', value: Number.parseFloat(n) }
  }

  readIdentifier(): t.IdentifierToken {
    let id = this.readWhile(this.isIdentifier)

    return { type: this.isKeyword(id) ? 'kw' : 'var', value: id }
  }

  readEscaped(end: string): string {
    let escaped = false
    let str = ''

    this.input.next()

    while (!this.input.eof()) {
      let ch = this.input.next()

      if (escaped) {
        str = str + ch
        escaped = false
      } else if (ch === '\\') {
        escaped = true
      } else if (ch === end) {
        break
      } else {
        str = str + ch
      }
    }

    return str
  }

  readString(): t.StringToken {
    return { type: 'str', value: this.readEscaped('"') }
  }

  skipComment(): void {
    this.readWhile(ch => ch !== '\n')
    this.input.next()
  }

  readNext(): t.Token | null {
    this.readWhile(this.isWhitespace)

    if (this.input.eof()) return null

    let ch = this.input.peek()

    if (ch === '#') {
      this.skipComment()
      return this.readNext()
    }

    if (ch === '"') return this.readString()
    if (this.isDigit(ch)) return this.readNumber()
    if (this.isIdentifierStart(ch)) return this.readIdentifier()
    if (this.isPunctuation(ch))
      return { type: 'punc', value: this.input.next() }
    if (this.isOperatorCharacter(ch))
      return { type: 'op', value: this.readWhile(this.isOperatorCharacter) }

    return this.input.croak(`Unable to handle character: ${ch}`)
  }

  peek(): t.Token | null {
    return this.current || (this.current = this.readNext())
  }

  next(): t.Token | null {
    let token = this.current
    this.current = null
    return token || this.readNext()
  }

  eof(): boolean {
    return this.peek() === null
  }

  croak(msg: string): never {
    return this.input.croak(msg)
  }
}
