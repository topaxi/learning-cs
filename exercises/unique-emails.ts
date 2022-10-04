import { HashSet } from '../data-structures/hash/hash-set'
import { length } from '../utils/iterator/length'
import { map } from '../utils/iterator/map'

export function uniqueEmails(emails: readonly string[]): number {
  return length(HashSet.from(map(emails, normalize)))
}

function normalize(email: string): string {
  let [local, domain] = email.split('@')

  return local.replace(/\.|\+.*$/g, '') + '@' + domain
}
