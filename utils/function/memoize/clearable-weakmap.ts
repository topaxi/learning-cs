export class ClearableWeakmap<T extends object, U> {
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

  clear(): void {
    this._weakMap = new WeakMap()
  }
}
