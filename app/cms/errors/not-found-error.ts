export class NotFoundError extends Error {
  constructor(public readonly path: string, message?: string) {
    super(message ?? `Not found: ${path}`)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError)
    }

    this.name = "NotFoundError"
  }
}
