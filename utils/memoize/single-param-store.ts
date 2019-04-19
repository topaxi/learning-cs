import { ClearableWeakmap } from '../clearable-weakmap'

export class SingleParamStore<T extends any[], U> extends Map<T, U> {
  get(key: T) {
    return super.get(key[0])
  }

  set(key: T, value: U) {
    return super.set(key[0], value)
  }

  has(key: T) {
    return super.has(key[0])
  }
}

export class WeakSingleParamStore<T extends any[], U> extends ClearableWeakmap<
  T,
  U
> {
  get(key: T) {
    return super.get(key[0])
  }

  set(key: T, value: U) {
    return super.set(key[0], value)
  }

  has(key: T) {
    return super.has(key[0])
  }
}
