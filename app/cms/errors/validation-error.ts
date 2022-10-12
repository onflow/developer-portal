export class ValidationError extends Error {
  constructor(message?: string, public readonly path?: string) {
    super(message ?? "Uknown validation error")

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }

    this.name = "ValidationError"
  }
}
