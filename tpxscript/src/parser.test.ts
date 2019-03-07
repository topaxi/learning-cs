import { parse } from './parser'

describe('tpxscript::Parser', () => {
  test('should parse numbers', () => {
    expect(parse('123.5')).toEqual({
      type: 'prog',
      prog: [{ type: 'num', value: 123.5 }]
    })
  })

  test('should parse strings', () => {
    expect(parse('"Hello, World!"')).toEqual({
      type: 'prog',
      prog: [{ type: 'str', value: 'Hello, World!' }]
    })
  })

  test('should parse booleans', () => {
    expect(parse('true')).toEqual({
      type: 'prog',
      prog: [{ type: 'bool', value: true }]
    })
    expect(parse('false')).toEqual({
      type: 'prog',
      prog: [{ type: 'bool', value: false }]
    })
  })

  test('should parse identifiers', () => {
    expect(parse('foo')).toEqual({
      type: 'prog',
      prog: [{ type: 'var', value: 'foo' }]
    })
  })

  test('should parse function declarations', () => {
    expect(parse('fn (x) x')).toMatchSnapshot()
  })

  test('should parse function calls', () => {
    expect(parse('foo(x, 1)')).toMatchSnapshot()
  })

  test('should parse conditionals', () => {
    expect(parse('if foo then bar else baz')).toMatchSnapshot()
    expect(parse('if foo then bar')).toMatchSnapshot()
  })

  test('should parse assignments', () => {
    expect(parse('x = 10')).toMatchSnapshot()
  })

  test('should parse arithmetic', () => {
    expect(parse('x + y * z;')).toMatchSnapshot()
  })

  test.skip('should parse blocks', () => {
    expect(
      parse(`
      {
        a = 5;
        b = a * 2;
        a + b;
      };
    `)
    ).toMatchSnapshot()
  })

  test.skip('should parse block variables', () => {
    expect(
      parse(`
      let (a = 10, b = a * 10) {
        a + b
      }
    `)
    ).toMatchSnapshot()
  })
})
