import { expect } from 'chai'
import { hightlightHTML } from './highlight-html'

describe('highlightHTML', () => {
  it('should highlight terms in bold', () => {
    expect(hightlightHTML('mabababab', ['a', 'aba'])).to.equal(
      'm<b>abababa</b>b'
    )
  })
})
