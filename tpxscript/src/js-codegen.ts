import * as t from './lexer/tokens'
import { FALSE } from './parser'

export class JsCodegen {
  // eslint-disable-next-line complexity
  generate(exp: t.Token): string {
    switch (exp.type) {
      case 'num':
      case 'str':
      case 'bool':
        return this.atom(exp)
      case 'binary':
        return this.binary(exp)
      case 'var':
        return this.var(exp)
      case 'assign':
        return this.assign(exp as t.AssignToken)
      case 'if':
        return this.if(exp)
      case 'fn':
        return this.fn(exp)
      case 'prog':
        return this.prog(exp)
      case 'call':
        return this.call(exp)
      case 'kw':
      case 'punc':
      case 'op':
      case 'let':
      default:
        throw new Error(`Unexpected token ${exp.type}`)
    }
  }

  private atom(exp: t.Token | any): string {
    return JSON.stringify(exp.value)
  }

  private makeVar(name: string): string {
    return name
  }

  private var(exp: t.VarToken): string {
    return this.makeVar(exp.value)
  }

  private binary(exp: t.BinaryToken): string {
    return `(${this.generate(exp.left)} ${this.operator(
      exp.operator
    )} ${this.generate(exp.right)})`
  }

  private operator(operator: string): string {
    switch (operator) {
      case 'or':
        return '||'
      case 'and':
        return '&&'
      default:
        return operator
    }
  }

  private assign(exp: t.AssignToken): string {
    return this.binary(exp)
  }

  private fn(exp: t.FnToken): string {
    let argList = exp.vars.map(this.makeVar, this).join(', ')
    let fnBody = this.generate(exp.body)

    if (typeof exp.name === 'string') {
      return `(function ${this.makeVar(
        exp.name
      )}(${argList}) { return ${fnBody} })`
    }

    return `(${argList}) => ${fnBody}`
  }

  private prog(exp: t.ProgToken): string {
    return `(${exp.prog.map(this.generate, this).join(',')})`
  }

  private call(exp: t.CallToken): string {
    return `${this.generate(exp.func)}(${exp.args
      .map(this.generate, this)
      .join(', ')})`
  }

  private if(exp: t.IfToken): string {
    return `(${this.generate(exp.cond)} ? ${this.generate(
      exp.then
    )} : ${this.generate(exp.else || FALSE)})`
  }
}
