import { assertNever } from '../../utils/assert-never'
import * as n from './parser/ast'
import { FALSE } from './parser'

export class JsCodegen {
  // eslint-disable-next-line complexity
  generate(exp: n.Node): string {
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
        return this.assign(exp as n.AssignNode)
      case 'if':
        return this.if(exp)
      case 'fn':
        return this.fn(exp)
      case 'prog':
        return this.prog(exp)
      case 'call':
        return this.call(exp)
      case 'let':
        throw new Error(`let blocks are not implemented yet`)
      default:
        return assertNever(exp)
    }
  }

  private atom(exp: n.NumberNode | n.StringNode | n.BooleanNode): string {
    return JSON.stringify(exp.value)
  }

  private makeVar(name: string): string {
    return name
  }

  private var(exp: n.VarNode): string {
    return this.makeVar(exp.value)
  }

  private binary(exp: n.BinaryNode): string {
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

  private assign(exp: n.AssignNode): string {
    return this.binary(exp)
  }

  private fn(exp: n.FnNode): string {
    let argList = exp.vars.map(this.makeVar, this).join(', ')
    let fnBody = this.generate(exp.body)

    if (typeof exp.name === 'string') {
      return `(function ${this.makeVar(
        exp.name
      )}(${argList}) { return ${fnBody} })`
    }

    return `(${argList}) => ${fnBody}`
  }

  private prog(exp: n.ProgNode): string {
    return `(${exp.prog.map(this.generate, this).join(',')})`
  }

  private call(exp: n.CallNode): string {
    return `${this.generate(exp.func)}(${exp.args
      .map(this.generate, this)
      .join(', ')})`
  }

  private if(exp: n.IfNode): string {
    return `(${this.generate(exp.cond)} ? ${this.generate(
      exp.then
    )} : ${this.generate(exp.else || FALSE)})`
  }
}
