import { convertToTitle, convertToTitleR } from './excel-column'

describe('168. Excel Sheet Column Title', () => {
  ;[convertToTitle, convertToTitleR].forEach(convertToTitle => {
    test.each<[number, string]>([[1, 'A'], [26, 'Z'], [27, 'AA'], [28, 'AB']])(
      `${convertToTitle.name}(%o) should return column title %o`,
      (column, title) => {
        expect(convertToTitle(column)).toBe(title)
      }
    )
  })
})
