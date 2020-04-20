import { match } from './regex'

describe('regex', () => {
  test('empty pattern', () => {
    expect(match('', 'foo')).toBe(true)
  })

  test('simple text pattern', () => {
    expect(match('foo', 'foobar')).toBe(true)
    expect(match('bar', 'foobar')).toBe(true)
    expect(match('fob', 'foobar')).toBe(false)
  })

  describe('^', () => {
    test('should match start of string', () => {
      expect(match('^a', 'a')).toBe(true)
      expect(match('^abc', 'abcdef')).toBe(true)
      expect(match('^abcdef', 'abcde')).toBe(false)
      expect(match('^bcd', 'abcde')).toBe(false)
    })
  })

  describe('$', () => {
    test('should return true for empty string', () => {
      expect(match('$', '')).toBe(true)
      expect(match('a$', '')).toBe(false)
    })

    test('should match end of strings', () => {
      expect(match('a$', 'a')).toBe(true)
      expect(match('def$', 'abcdef')).toBe(true)
      expect(match('def$', 'abcde')).toBe(false)
    })
  })

  describe('.', () => {
    test('should match any character', () => {
      expect(match('.', 'a')).toBe(true)
      expect(match('.', 'ab')).toBe(true)
      expect(match('..', 'ab')).toBe(true)
      expect(match('...', 'ab')).toBe(false)

      expect(match('a.', 'ab')).toBe(true)
      expect(match('.a', 'ab')).toBe(false)

      expect(match('.', '')).toBe(false)
    })
  })

  describe('?', () => {
    test('should match zero or one', () => {
      expect(match('a?', '')).toBe(true)
      expect(match('ba?', 'ba')).toBe(true)
      expect(match('ba?', 'b')).toBe(true)
      expect(match('ba?', '')).toBe(false)
    })
  })

  describe('*', () => {
    test('should match zero or more', () => {
      expect(match('a*', '')).toBe(true)
      expect(match('a*', 'a')).toBe(true)
      expect(match('a*', 'aaa')).toBe(true)
      expect(match('a*', 'bbb')).toBe(true)
    })
  })

  describe('+', () => {
    test('should match one or more', () => {
      expect(match('a+', '')).toBe(false)
      expect(match('a+', 'a')).toBe(true)
      expect(match('a+', 'aaa')).toBe(true)
      expect(match('a+', 'bbb')).toBe(false)
    })
  })

  test.each<[string, string, boolean]>([
    ['^ab.$', 'abc', true],
    ['^ab.*$', 'abc', true],
    ['^ab.*$', 'abcdef', true],
    ['^ab.+$', 'ab', false],
    ['^ba+$', 'ba', true],
    ['^ba+$', 'baaa', true],
    ['^ba+$', 'aaa', false],
    ['^ba+$', 'aabaaaa', false],
    ['ba*$', 'aabaaaa', true],
  ])('match(%o, %o) is %o', (pattern, str, expected) => {
    expect(match(pattern, str)).toBe(expected)
  })
})
