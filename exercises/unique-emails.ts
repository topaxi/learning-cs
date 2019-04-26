export function uniqueEmails(emails: readonly string[]): number {
  return new Set(emails.map(normalize)).size
}

function normalize(email: string): string {
  let [local, domain] = email.split('@')
  return local.replace(/\.|\+.*$/g, '') + '@' + domain
}
