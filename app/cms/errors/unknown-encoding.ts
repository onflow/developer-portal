export class UnknownEncoding extends Error {
  constructor(
    public readonly path: string,
    public readonly encoding: string,
    message?: string
  ) {
    super(message ?? `Unknown encoding "${path}" for "${path}"`)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownEncoding)
    }

    this.name = "UnknownEncoding"
  }
}
