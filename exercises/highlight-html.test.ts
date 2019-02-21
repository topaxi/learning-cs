import { hightlightHTML } from './highlight-html'

describe('highlightHTML', () => {
  test('should highlight terms in bold', () => {
    expect(hightlightHTML('mabababab', ['a', 'aba'])).toBe('m<b>abababa</b>b')
  })
})
