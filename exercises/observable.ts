interface Observer<T, E = any> {
  next(value: T): void
  error(error: E): void
  complete(): void
}

interface Teardown {
  (): any
}

export class Subscription {
  private teardowns: Teardown[] = []

  constructor(teardown?: Teardown | void) {
    this.add(teardown)
  }

  add(teardown?: Teardown | void): void {
    if (teardown !== undefined) {
      this.teardowns.push(teardown)
    }
  }

  unsubscribe(): void {
    for (let teardown; (teardown = this.teardowns.shift()); ) {
      teardown()
    }
  }
}

class Subscriber<T, E = any> implements Observer<T, E> {
  private closed = false

  constructor(
    private readonly destination: Partial<Observer<T, E>>,
    private readonly subscription: Subscription
  ) {}

  next(value: T): void {
    if (this.closed === false && this.destination.next !== undefined) {
      this.destination.next(value)
    }
  }

  error(err: E): void {
    if (this.closed === false && this.destination.error !== undefined) {
      this.closed = true
      this.destination.error(err)
      this.subscription.unsubscribe()
    } else {
      this.closed = true
    }
  }

  complete(): void {
    if (this.closed === false && this.destination.complete !== undefined) {
      this.closed = true
      this.destination.complete()
      this.subscription.unsubscribe()
    } else {
      this.closed = true
    }
  }
}

export class Observable<T> {
  constructor(
    private readonly _subscribe: (observer: Observer<T>) => Teardown | void
  ) {}

  subscribe(observer: Partial<Observer<T>>): Subscription {
    let subscription = new Subscription()
    subscription.add(this._subscribe(new Subscriber(observer, subscription)))
    return subscription
  }

  toPromise(): Promise<T> {
    let value: T

    return new Promise<T>((resolve, reject) =>
      this.subscribe({
        next: v => (value = v),
        error: reject,
        complete: () => resolve(value),
      })
    )
  }
}
