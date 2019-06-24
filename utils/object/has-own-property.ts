const _hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwnProperty = <T>(obj: T, key: string) =>
  _hasOwnProperty.call(obj, key)
