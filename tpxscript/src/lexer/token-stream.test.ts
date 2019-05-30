import { InputStream } from '../input-stream'
import { TokenStream } from './token-stream'

function parse(str: string) {
  let i = new InputStream(str)
  let t = new TokenStream(i)

  let ast = []

  while (!t.eof()) {
    ast.push(t.next())
  }

  return ast
}

describe('tpxscript::TokenStream', () => {
  test('should tokenize numbers', () => {
    expect(parse('123.5')).toEqual([{ type: 'num', value: 123.5 }])
  })

  test('should tokenize strings', () => {
    expect(parse('"Hello, World!"')).toEqual([
      { type: 'str', value: 'Hello, World!' }
    ])
  })

  test('should tokenize booleans', () => {
    expect(parse('true')).toEqual([{ type: 'kw', value: 'true' }])
    expect(parse('false')).toEqual([{ type: 'kw', value: 'false' }])
  })

  test('should tokenize identifiers', () => {
    expect(parse('foo')).toEqual([{ type: 'var', value: 'foo' }])
  })

  test('should tokenize function declarations', () => {
    expect(parse('fn (x) x')).toMatchSnapshot()
  })

  test('should tokenize function calls', () => {
    expect(parse('foo(x, 1)')).toMatchSnapshot()
  })

  test('should tokenize conditionals', () => {
    expect(parse('if foo then bar else baz')).toMatchSnapshot()
    expect(parse('if foo then bar')).toMatchSnapshot()
  })

  test('should tokenize assignments', () => {
    expect(parse('x = 10')).toMatchSnapshot()
  })

  test('should tokenize arithmetic', () => {
    expect(parse('x + y')).toMatchSnapshot()
    expect(parse('x + y * z')).toMatchSnapshot()
  })

  test('should tokenize logical operators', () => {
    expect(parse('x && y')).toMatchSnapshot()
    expect(parse('x || y')).toMatchSnapshot()
    expect(parse('x and y')).toMatchSnapshot()
    expect(parse('x or y')).toMatchSnapshot()
  })

  test('should tokenize blocks', () => {
    expect(
      parse(`
      {
        a = 5;
        b = a * 2;
        a + b;
      }
    `)
    ).toMatchSnapshot()
  })

  test('should tokenize block variables', () => {
    expect(
      parse(`
      let (a = 10, b = a * 10) {
        a + b
      }
    `)
    ).toMatchSnapshot()
  })
})
