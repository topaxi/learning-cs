import { uniqueEmails } from './unique-emails'

describe('929. Unique Email Addresses', () => {
  test('should count unique emails', () => {
    expect(
      uniqueEmails([
        'test.email+alex@example.com',
        'test.e.mail+bob.cathy@example.com',
        'testemail+david@ex.ample.com',
      ])
    ).toBe(2)
  })
})
