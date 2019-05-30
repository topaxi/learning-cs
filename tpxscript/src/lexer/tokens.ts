export type TokenType =
  | 'num'
  | 'kw'
  | 'punc'
  | 'op'
  | 'str'
  | 'bool'
  | 'var'
  | 'binary'
  | 'assign'
  | 'let'
  | 'fn'
  | 'if'
  | 'prog'
  | 'call'

export interface NumberToken {
  type: 'num'
  value: number
}

export interface KeywordToken {
  type: 'kw'
  value: string
}

export interface VarToken {
  type: 'var'
  value: string
}

export type IdentifierToken = KeywordToken | VarToken

export interface StringToken {
  type: 'str'
  value: string
}

export interface PunctuationToken {
  type: 'punc'
  value: string
}

export interface OperatorToken {
  type: 'op'
  value: string
}

export interface BooleanToken {
  type: 'bool'
  value: boolean
}

export interface CallToken {
  type: 'call'
  func: Token
  args: any[]
}

export interface IfToken {
  type: 'if'
  cond: Token
  then: Token
  else: Token | undefined
}

export interface FnToken {
  type: 'fn'
  name: string | undefined
  vars: any[]
  body: Token
}

export interface BinaryToken {
  type: 'binary' | 'assign'
  operator: string
  left: Token
  right: Token
}

export interface AssignToken extends BinaryToken {
  type: 'assign'
  operator: '='
}

export interface ProgToken {
  type: 'prog'
  prog: Token[]
}

export interface LetToken {
  type: 'let'
}

export type Token =
  | NumberToken
  | KeywordToken
  | VarToken
  | StringToken
  | PunctuationToken
  | OperatorToken
  | BooleanToken
  | CallToken
  | IfToken
  | FnToken
  | BinaryToken
  | AssignToken
  | ProgToken
  | LetToken
