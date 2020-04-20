import { hightlightHTML } from './highlight-html'

describe('highlightHTML', () => {
  test('should highlight terms in bold', () => {
    expect(hightlightHTML('foobarbaz', ['foo', 'baz'])).toBe(
      '<b>foo</b>bar<b>baz</b>'
    )
    expect(hightlightHTML('foobarbaz', ['foo', 'bar'])).toBe(
      '<b>foo</b><b>bar</b>baz'
    )
    expect(hightlightHTML('foobarbaz', ['foo', 'bar', 'baz'])).toBe(
      '<b>foo</b><b>bar</b><b>baz</b>'
    )
  })

  test('should highlight overlapping terms in bold', () => {
    expect(hightlightHTML('foobarbaz', ['foob', 'bar'])).toBe(
      '<b>foobar</b>baz'
    )
    expect(hightlightHTML('mabababab', ['a', 'aba'])).toBe('m<b>abababa</b>b')
  })
})
