import * as prettier from 'prettier'
import { parse } from './parser'
import { JsCodegen } from './js-codegen'

function codegen(src: string) {
  return prettier.format(codegenUgly(src), {
    semi: false,
    parser: 'babel'
  })
}

function codegenUgly(src: string) {
  let gen = new JsCodegen()

  return gen.generate(parse(src) as any)
}

describe('tpxscript::JsCodegen', () => {
  test('should codegen numbers', () => {
    expect(codegenUgly('123.5')).toEqual('(123.5)')
  })

  test('should codegen strings', () => {
    expect(codegenUgly('"Hello, World!"')).toEqual('("Hello, World!")')
  })

  test('should codegen booleans', () => {
    expect(codegenUgly('true')).toEqual('(true)')
    expect(codegenUgly('false')).toEqual('(false)')
  })

  test('should codegen identifiers', () => {
    expect(codegenUgly('foo')).toEqual('(foo)')
  })

  test('should codegen function declarations', () => {
    expect(codegen('fn (x) x')).toMatchSnapshot()
    expect(codegen('fn (x) { x }')).toMatchSnapshot()
    expect(codegen('fn foo(x) x')).toMatchSnapshot()
    expect(codegen('fn foo(x) { x }')).toMatchSnapshot()
  })

  test('should codegen function calls', () => {
    expect(codegen('foo(x, 1)')).toMatchSnapshot()
  })

  test('should codegen conditionals', () => {
    expect(codegen('if foo then bar else baz')).toMatchSnapshot()
    expect(codegen('if foo then bar')).toMatchSnapshot()
    expect(codegen('if foo then if bar then baz')).toMatchSnapshot()
  })

  test('should codegen assignments', () => {
    expect(codegen('x = 10')).toMatchSnapshot()
  })

  test('should codegen arithmetic', () => {
    expect(codegenUgly('x + y')).toMatchSnapshot()
    expect(codegenUgly('x + y * z')).toMatchSnapshot()
  })

  test('should codegen logical operators', () => {
    expect(codegenUgly('x || y')).toEqual('((x || y))')
    expect(codegenUgly('x && y')).toEqual('((x && y))')
    expect(codegenUgly('x or y')).toEqual('((x || y))')
    expect(codegenUgly('x and y')).toEqual('((x && y))')
  })

  test('should codegen program', () => {
    let js = codegen(`
      fib = fn fib(n) if n < 3 then 1 else fib(n - 1) + fib(n - 2);
      ret = fib(10);
    `)
    expect(js).toMatchSnapshot()
    expect(new Function(`${js}; return ret`)()).toBe(55)
  })

  test.skip('should codegen blocks', () => {
    expect(
      codegen(`
      {
        a = 5;
        b = a * 2;
        a + b;
      };
    `)
    ).toMatchSnapshot()
  })

  test.skip('should codegen block variables', () => {
    expect(
      codegen(`
      let (a = 10, b = a * 10) {
        a + b
      }
    `)
    ).toMatchSnapshot()
  })
})
