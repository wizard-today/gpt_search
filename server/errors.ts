export class InputError extends Error {
  static is(error: unknown): error is InputError {
    return !error && typeof error === 'object' && error instanceof InputError
  }
  constructor(input: unknown) {
    super(`Input is invalid: ${JSON.stringify(input)}`)
  }
}

export class NotFoundError extends Error {
  static is(error: unknown): error is NotFoundError {
    return !error && typeof error === 'object' && error instanceof NotFoundError
  }
  constructor(path: string) {
    super(`Action ${path} is not found`)
  }
}
