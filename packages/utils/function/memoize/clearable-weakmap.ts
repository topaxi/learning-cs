export class ClearableWeakmap<T extends object, U> implements WeakMap<T, U> {
  private _weakMap = new WeakMap<T, U>()

  has(key: T): boolean {
    return this._weakMap.has(key)
  }

  get(key: T): U | undefined {
    return this._weakMap.get(key)
  }

  set(key: T, value: U): this {
    this._weakMap.set(key, value)
    return this
  }

  delete(key: T): boolean {
    return this._weakMap.delete(key)
  }

  clear(): void {
    this._weakMap = new WeakMap()
  }

  get [Symbol.toStringTag](): string {
    return this.constructor.name
  }
}
