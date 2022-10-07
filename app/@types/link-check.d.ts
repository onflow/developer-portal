// NPM: https://www.npmjs.com/package/link-check
// Source: https://github.com/tcort/link-check

declare module "link-check" {
  export class LinkCheckResult {
    /**
     *  the link provided as input
     */
    link: string

    /**
     *  a string set to either alive or dead.
     */
    status: "alive" | "dead"

    /**
     *  the HTTP status code. Set to 0 if no HTTP status code was returned (e.g. when the server is down).
     */
    statusCode: number

    /**
     *  any connection error that occurred, otherwise null.
     */
    err: unknown
  }

  interface LinkCheckOptions {
    /**
     * array of anchor strings (e.g. [ "#foo", "#bar" ]) for checking anchor links (e.g. <a href="#foo">Foo</a>).
     * @defaultValue `[]`
     */
    anchors?: string[]

    /**
     * the base URL for relative links.
     */
    baseUrl?: string

    /**
     *  timeout in zeit/ms format. (e.g. "2000ms", 20s, 1m). Default 10s.
     * @defaultValue `"10s"`
     */
    timeout?: string

    /**
     * @experimental Undocumented
     * @defaultValue `"10s"`
     */
    open_timeout?: string

    /**
     * the user-agent string. Default ${name}/${version} (e.g. link-check/4.5.5)
     * @defaultValue `"link-check/5.2.0"`
     */
    user_agent?: string

    /**
     * an array of numeric HTTP Response codes which indicate that the link is alive. Entries in this array may also be regular expressions. Example: [ 200, /^[45][0-9]{2}$/ ]. Default [ 200 ].
     * @defaultValue `[ 200 ]`
     */
    aliveStatusCodes?: Array<number | RegExp>

    /**
     * a string based attribute value object to send custom HTTP headers. Example: { 'Authorization' : 'Basic Zm9vOmJhcg==' }.
     */
    headers?: Record<string, string>

    /**
     * a boolean indicating whether to retry on a 429 (Too Many Requests) response. When true, if the response has a 429 HTTP code and includes an optional retry-after header, a retry will be attempted after the delay indicated in the retry-after header. If no retry-after header is present in the response or the retry-after header value is not valid according to RFC7231 (value must be in seconds), a default retry delay of 60 seconds will apply. This default can be overriden by the fallbackRetryDelay parameter.
     * @defaultValue `false`

     */
    retryOn429?: boolean

    /**
     * the number of retries to be made on a 429 response. Default 2.
     * @defaultValue `2`
     */
    retryCount?: number

    /**
     * the delay in zeit/ms format. (e.g. "2000ms", 20s, 1m) for retries on a 429 response when no retry-after header is returned or when it has an invalid value. Default is 60s.
     * @defaultValue `"60s"`
     */
    fallbackRetryDelay?: string
  }

  interface LinkCheckCallback {
    (err: null, result: LinkCheckResult): void
    (err: Error, result: null): void
  }

  function linkCheck(
    url: string,
    opts: LinkCheckOptions,
    cb: LinkCheckCallback
  ): void
  function linkCheck(url: string, cb: LinkCheckCallback): void

  export default linkCheck
}
