export class InvalidPathError extends Error {
  constructor(public readonly path: string, message?: string) {
    super(message ?? `Invalid path: ${path}`)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPathError)
    }

    this.name = "InvalidPathError"
  }
}
