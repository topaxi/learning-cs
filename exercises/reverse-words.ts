export function reverseWords(s: string): string {
  return s.split(' ').map(reverseWord).join(' ')
}

function reverseWord(str: string): string {
  return str.split('').reverse().join('')
}
