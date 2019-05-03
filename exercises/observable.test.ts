import { Observable } from './observable'

describe('Observable<T>', () => {
  test('should emit data', () => {
    let o = new Observable<number>(observer => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.complete()
    })

    let values: number[] = []

    o.subscribe({
      next(value) {
        values.push(value)
      }
    })

    expect(values).toEqual([1, 2, 3])
  })

  test('should no longer emit data after completion', () => {
    let o = new Observable<number>(observer => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.complete()
      observer.next(4)
      observer.next(5)
      observer.next(6)
    })

    let values: number[] = []

    o.subscribe({
      next(value) {
        values.push(value)
      }
    })

    expect(values).toEqual([1, 2, 3])
  })

  test('should emit data over time', done => {
    let o = new Observable<number>(observer => {
      let i = 0
      let id = setInterval(() => observer.next(++i), 10)
      return () => clearInterval(id)
    })

    let values: number[] = []

    let sub = o.subscribe({
      next(value) {
        values.push(value)
      }
    })

    setTimeout(() => {
      sub.unsubscribe()
      expect(values).toEqual([1, 2, 3])
      done()
    }, 35)
  })

  test('should emit error and close observable', () => {
    let o = new Observable<number>(observer => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.error(new Error('oops'))
      observer.next(4)
      observer.next(5)
      observer.next(6)
    })

    let values: number[] = []
    let error: any
    let complete = jest.fn()

    o.subscribe({
      next(value) {
        values.push(value)
      },
      error(err: any) {
        error = err
      },
      complete
    })

    expect(values).toEqual([1, 2, 3])
    expect(error).toEqual(new Error('oops'))
    expect(complete).not.toHaveBeenCalled()
  })

  describe('#toPromise()', () => {
    test('should convert to a promise and resolve the last value', async () => {
      let o = new Observable<number>(observer => {
        let i = 0
        let id = setInterval(() => observer.next(++i), 10)
        setTimeout(() => observer.complete(), 35)
        return () => clearInterval(id)
      })

      expect(await o.toPromise()).toBe(3)
    })
  })
})
