import { InputStream } from './input-stream'
import { TokenStream, Token } from './token-stream'

export const FALSE: Token<false> = { type: 'bool', value: false }
const PRECEDENCE: Record<string, number> = {
  '=': 2,
  '||': 3,
  '&&': 4,
  '<': 8,
  '>': 8,
  '>=': 8,
  '<=': 8,
  '==': 8,
  '!=': 8,
  '<<': 10,
  '>>': 10,
  '>>>': 10,
  '+': 11,
  '-': 11,
  '*': 20,
  '/': 20,
  '%': 20,
  '**': 25
}

export function parse(str: string) {
  let input = new InputStream(str)
  let tokens = new TokenStream(input)

  return parseTokens(tokens)
}

export function parseTokens(tokens: TokenStream) {
  let parser = new Parser(tokens)

  return parser.parseToplevel()
}

export class Parser {
  constructor(readonly tokens: TokenStream) {}

  isToken(type: string, ch?: string): Token | false {
    let token = this.tokens.peek()

    return (
      token !== null &&
      token.type === type &&
      (!ch || token.value === ch) &&
      token
    )
  }

  isPunctuation(ch?: string): Token | false {
    return this.isToken('punc', ch)
  }

  isKeyword(kw?: string): Token | false {
    return this.isToken('kw', kw)
  }

  isOperator(op?: string): Token | false {
    return this.isToken('op', op)
  }

  skipPunctuation(ch: string) {
    if (this.isPunctuation(ch) !== false) {
      this.tokens.next()
    } else {
      this.tokens.croak(`Expecting punctuation: "${ch}"`)
    }
  }

  skipKeyword(kw: string) {
    if (this.isKeyword(kw) !== false) {
      this.tokens.next()
    } else {
      this.tokens.croak(`Expecting keyword: "${kw}"`)
    }
  }

  skipOperator(op: string) {
    if (this.isOperator(op) !== false) {
      this.tokens.next()
    } else {
      this.tokens.croak(`Expecting operator: "${op}"`)
    }
  }

  unexpected(): never {
    return this.tokens.croak(
      `Unexpected token: ${JSON.stringify(this.tokens.peek())}`
    )
  }

  maybeBinary(left: any, myPrec: any): any {
    let token: any = this.isOperator()

    if (token !== false) {
      let hisPrec = PRECEDENCE[token.value as any]

      if (hisPrec > myPrec) {
        this.tokens.next()
        return this.maybeBinary(
          {
            type: token.value === '=' ? 'assign' : 'binary',
            operator: token.value,
            left,
            right: this.maybeBinary(this.parseAtom(), hisPrec)
          },
          myPrec
        )
      }
    }

    return left
  }

  delimited<T>(
    start: string,
    stop: string,
    separator: string,
    parser: (this: this) => T
  ): T[] {
    let a = []
    let first = true

    this.skipPunctuation(start)

    while (!this.tokens.eof()) {
      if (this.isPunctuation(stop) !== false) break
      if (first) {
        first = false
      } else {
        this.skipPunctuation(separator)
      }
      if (this.isPunctuation(stop) !== false) break
      a.push(parser.call(this))
    }
    this.skipPunctuation(stop)
    return a
  }

  parseCall(func: any) {
    return {
      type: 'call',
      func,
      args: this.delimited('(', ')', ',', this.parseExpression)
    }
  }

  parseVarname(): string {
    let name = this.tokens.next()

    if (!name || name.type !== 'var') {
      return this.tokens.croak('Expecting variable name')
    }

    return name.value
  }

  parseIf() {
    this.skipKeyword('if')

    let cond = this.parseExpression()

    if (this.isPunctuation('{') === false) this.skipKeyword('then')

    let then = this.parseExpression()
    let _else

    if (this.isKeyword('else') !== false) {
      this.tokens.next()
      _else = this.parseExpression()
    }

    return { type: 'if', cond, then, else: _else }
  }

  parseFn() {
    return {
      type: 'fn',
      name:
        this.tokens.peek()!.type === 'var'
          ? this.tokens.next()!.value
          : undefined,
      vars: this.delimited('(', ')', ',', this.parseVarname),
      body: this.parseExpression()
    }
  }

  parseBool() {
    return {
      type: 'bool',
      value: this.tokens.next()!.value === 'true'
    }
  }

  maybeCall(expr: () => Token) {
    let res = expr()

    return this.isPunctuation('(') !== false ? this.parseCall(res) : res
  }

  parseAtom() {
    return this.maybeCall(() => {
      if (this.isPunctuation('(') !== false) {
        this.tokens.next()
        let expr = this.parseExpression()
        this.skipPunctuation(')')
        return expr
      }

      if (this.isPunctuation('{') !== false) return this.parseProg()
      if (this.isKeyword('if') !== false) return this.parseIf()
      if (
        this.isKeyword('true') !== false ||
        this.isKeyword('false') !== false
      )
        return this.parseBool()
      if (this.isKeyword('fn') !== false) {
        this.tokens.next()
        return this.parseFn()
      }

      let token = this.tokens.next()!

      if (
        token.type === 'var' ||
        token.type === 'num' ||
        token.type === 'str'
      ) {
        return token
      }

      this.unexpected()
    })
  }

  parseToplevel(): { type: 'prog'; prog: Token[] } {
    let prog = []

    while (!this.tokens.eof()) {
      prog.push(this.parseExpression())

      if (!this.tokens.eof()) this.skipPunctuation(';')
    }

    return { type: 'prog', prog }
  }

  parseProg(): { type: 'prog'; prog: Token[] } | typeof FALSE {
    let prog = this.delimited('{', '}', ';', this.parseExpression)
    if (prog.length === 0) return FALSE
    if (prog.length === 1) return prog[0]
    return { type: 'prog', prog }
  }

  parseExpression(): any {
    return this.maybeCall(() => this.maybeBinary(this.parseAtom(), 0))
  }
}
