import { InputStream } from './input-stream'
import { TokenStream } from './lexer/token-stream'
import * as t from './lexer/tokens'

export const FALSE: t.BooleanToken = { type: 'bool', value: false }
const PRECEDENCE: Record<string, number> = {
  '=': 2,
  '||': 3,
  or: 3,
  '&&': 4,
  and: 4,
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

export class Parser {
  constructor(readonly tokens: TokenStream) {}

  isToken(type: t.TokenType, ch?: string): t.Token | false {
    let token = this.tokens.peek()

    return (
      token !== null &&
      token.type === type &&
      (!ch || (token as any).value === ch) &&
      token
    )
  }

  isPunctuation(ch?: string): t.PunctuationToken | false {
    return this.isToken('punc', ch) as any
  }

  isKeyword(kw?: string): t.KeywordToken | false {
    return this.isToken('kw', kw) as any
  }

  isOperator(op?: string): t.OperatorToken | false {
    return (this.isToken('op', op) ||
      this.isKeyword('or') ||
      this.isKeyword('and')) as any
  }

  skipPunctuation(ch: string): void {
    if (this.isPunctuation(ch) !== false) {
      this.tokens.next()
    } else {
      this.tokens.croak(`Expecting punctuation: "${ch}"`)
    }
  }

  skipKeyword(kw: string): void {
    if (this.isKeyword(kw) !== false) {
      this.tokens.next()
    } else {
      this.tokens.croak(`Expecting keyword: "${kw}"`)
    }
  }

  skipOperator(op: string): void {
    if (this.isOperator(op) !== false) {
      this.tokens.next()
    } else {
      this.tokens.croak(`Expecting operator: "${op}"`)
    }
  }

  unexpected(token = this.tokens.peek()): never {
    return this.tokens.croak(`Unexpected token: ${JSON.stringify(token)}`)
  }

  maybeBinary(left: t.Token, myPrec: number): t.Token {
    let token = this.isOperator()

    if (token !== false) {
      let hisPrec = PRECEDENCE[token.value]

      if (hisPrec > myPrec) {
        this.tokens.next()

        let binary: t.BinaryToken | t.AssignToken = {
          type: token.value === '=' ? 'assign' : 'binary',
          operator: token.value,
          left,
          right: this.maybeBinary(this.parseAtom(), hisPrec)
        }

        return this.maybeBinary(binary, myPrec)
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

  parseCall(func: t.Token): t.CallToken {
    return {
      type: 'call',
      func,
      args: this.delimited('(', ')', ',', this.parseExpression)
    }
  }

  parseVarname(): string {
    let name = this.tokens.next()

    if (name === null || name.type !== 'var') {
      return this.tokens.croak('Expecting variable name')
    }

    return name.value
  }

  parseIf(): t.IfToken {
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

  parseFn(): t.FnToken {
    return {
      type: 'fn',
      name:
        this.tokens.peek()!.type === 'var'
          ? (this.tokens.next() as t.VarToken).value
          : undefined,
      vars: this.delimited('(', ')', ',', this.parseVarname),
      body: this.parseExpression()
    }
  }

  parseBool(): t.BooleanToken {
    return {
      type: 'bool',
      value: (this.tokens.next() as t.IdentifierToken).value === 'true'
    }
  }

  maybeCall(expr: (this: this) => t.Token) {
    let res = expr.call(this)

    return this.isPunctuation('(') !== false ? this.parseCall(res) : res
  }

  private _parseAtom() {
    if (this.isPunctuation('(') !== false) {
      this.tokens.next()
      let expr = this.parseExpression()
      this.skipPunctuation(')')
      return expr
    }

    if (this.isPunctuation('{') !== false) return this.parseProg()
    if (this.isKeyword('if') !== false) return this.parseIf()
    if (this.isKeyword('true') !== false || this.isKeyword('false') !== false)
      return this.parseBool()
    if (this.isKeyword('fn') !== false) {
      this.tokens.next()
      return this.parseFn()
    }

    let token = this.tokens.next()!

    if (token.type === 'var' || token.type === 'num' || token.type === 'str') {
      return token
    }

    return this.unexpected(token)
  }

  parseAtom() {
    return this.maybeCall(this._parseAtom)
  }

  parseToplevel(): t.ProgToken {
    let prog = []

    while (!this.tokens.eof()) {
      prog.push(this.parseExpression())

      if (!this.tokens.eof()) this.skipPunctuation(';')
    }

    return { type: 'prog', prog }
  }

  parseProg(): t.ProgToken | t.Token | typeof FALSE {
    let prog = this.delimited('{', '}', ';', this.parseExpression)
    if (prog.length === 0) return FALSE
    if (prog.length === 1) return prog[0]
    return { type: 'prog', prog }
  }

  private _parseExpression(): t.Token {
    return this.maybeBinary(this.parseAtom(), 0)
  }

  parseExpression() {
    return this.maybeCall(this._parseExpression)
  }
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
