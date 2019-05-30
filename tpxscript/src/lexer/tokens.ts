export type TokenType = 'num' | 'kw' | 'punc' | 'op' | 'str' | 'var'

export interface BaseToken {
  type: TokenType
}

export interface NumberToken extends BaseToken {
  type: 'num'
  value: number
}

export interface KeywordToken extends BaseToken {
  type: 'kw'
  value: string
}

export interface VarToken extends BaseToken {
  type: 'var'
  value: string
}

export type IdentifierToken = KeywordToken | VarToken

export interface StringToken extends BaseToken {
  type: 'str'
  value: string
}

export interface PunctuationToken extends BaseToken {
  type: 'punc'
  value: string
}

export interface OperatorToken extends BaseToken {
  type: 'op'
  value: string
}

export type Token =
  | NumberToken
  | KeywordToken
  | VarToken
  | StringToken
  | PunctuationToken
  | OperatorToken
