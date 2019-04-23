import { partial, partialRight, pa, paR } from './partial'

describe('utils/function/partial', () => {
  test('pa alias', () => {
    expect(pa).toBe(partial)
  })

  test('paR alias', () => {
    expect(paR).toBe(partialRight)
  })

  describe('partial()', () => {
    test('should partially apply parameters', () => {
      let f = jest.fn()
      let fn = partial(f, 'a', 'b')

      fn('c')

      expect(f).toHaveBeenCalledWith('a', 'b', 'c')
    })
  })

  describe('partialRight()', () => {
    test('should partially apply parameters', () => {
      let f = jest.fn()
      let fn = partialRight(f, 'a', 'b')

      fn('c')

      expect(f).toHaveBeenCalledWith('c', 'a', 'b')
    })
  })
})
