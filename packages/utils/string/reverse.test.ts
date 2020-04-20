import { reverse } from './reverse'

describe('utils/string/reverse', () => {
  test('should reverse string', () => {
    expect(reverse('hello world')).toBe('dlrow olleh')
  })
})
