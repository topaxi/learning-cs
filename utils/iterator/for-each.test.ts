import { empty } from './empty'
import { forEach } from './for-each'

describe('iterator/forEach', () => {
  describe('empty iterable', () => {
    it('should call callback', () => {
      let fn = jest.fn()

      forEach('', fn)
      forEach([], fn)
      forEach(empty(), fn)

      expect(fn).not.toHaveBeenCalled()
    })
  })

  it.each([
    '123',
    ['1', '2', '3'],
    (function* () {
      yield '1'
      yield '2'
      yield '3'
    })(),
  ])('should call callback for every value', iterable => {
    let fn = jest.fn()

    forEach(iterable, fn)

    expect(fn).toHaveBeenCalledWith('1', 0)
    expect(fn).toHaveBeenCalledWith('2', 1)
    expect(fn).toHaveBeenCalledWith('3', 2)
  })
})
