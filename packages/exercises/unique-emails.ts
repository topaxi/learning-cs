import { map } from '../utils/iterator/map'

export function uniqueEmails(emails: readonly string[]): number {
  return new Set(map(emails, normalize)).size
}

function normalize(email: string): string {
  let [local, domain] = email.split('@')
  return local.replace(/\.|\+.*$/g, '') + '@' + domain
}
