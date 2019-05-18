import { size } from './size'

describe('utils/object/size', () => {
  test('should count the own enumerable properties', () => {
    expect(size({ a: 1, b: 2, c: 3 })).toBe(3)
    expect(size(Object.create({ a: 1, b: 2, c: 3 }))).toBe(0)
  })
})
