import { Token } from './token-stream'
import { FALSE } from './parser'

export class JsCodegen {
  // eslint-disable-next-line complexity
  generate(exp: Token): string {
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
        return this.assign(exp)
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

  private atom(exp: Token): string {
    return JSON.stringify(exp.value)
  }

  private makeVar(name: string): string {
    return name
  }

  private var(exp: Token<string>): string {
    return this.makeVar(exp.value)
  }

  private binary(exp: Token | any): string {
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

  private assign(exp: Token): string {
    return this.binary(exp)
  }

  private fn(exp: Token | any): string {
    let argList = exp.vars.map(this.makeVar, this).join(', ')

    let fnBody = `{ return ${this.generate(exp.body)} }`

    if (typeof exp.name === 'string') {
      return `(function ${this.makeVar(exp.name)}(${argList}) ${fnBody})`
    }

    return `(${argList}) => ${fnBody}`
  }

  private prog(exp: Token | any): string {
    return `(${exp.prog.map(this.generate, this).join(',')})`
  }

  private call(exp: Token | any): string {
    return `${this.generate(exp.func)}(${exp.args
      .map(this.generate, this)
      .join(', ')})`
  }

  private if(exp: Token | any): string {
    return `(${this.generate(exp.cond)} ? ${this.generate(
      exp.then
    )} : ${this.generate(exp.else || FALSE)})`
  }
}
