import Redis from "ioredis"
import { getRequiredServerEnvVar } from "./helpers"

declare global {
  // This prevents us from making multiple connections to the db when the
  // require cache is cleared.
  // eslint-disable-next-line
  var primaryClient: Redis | undefined
}

const REDIS_URL = getRequiredServerEnvVar("REDIS_URL")
const REDIS_CA = getRequiredServerEnvVar("REDIS_CA")

const primaryURL = new URL(REDIS_URL)
let primaryClient: Redis | null = null

primaryClient = createRedisClient("primaryClient", primaryURL.toString())

// Create Redis client instance
function createRedisClient(name: "primaryClient", url: string): Redis {
  let client = global[name]
  if (!client) {
    const dbURL = new URL(url)
    console.log(`Setting up redis client to ${dbURL.host}`)
    const connectOptions: { tls?: { ca: Buffer } } = {}

    if (url.startsWith("rediss:")) {
      console.log("Request TLS connection", url.startsWith("rediss:"))
      console.log(`TLS servername: ${dbURL.hostname}`)
      connectOptions.tls = { ca: Buffer.from(REDIS_CA, "utf-8") }
    }

    client = global[name] = new Redis(
      REDIS_URL,
      url.startsWith("rediss:")
        ? {
            tls: { servername: dbURL.hostname },
          }
        : {}
    )
  }
  return client
}

async function get<Value = unknown>(key: string): Promise<Value | null> {
  let result
  try {
    result = await primaryClient?.get(key)
  } catch (e) {
    console.log("REDIS ERROR:", e)
  }

  return result ? (JSON.parse(result) as Value) : null
}

async function set<Value>(key: string, value: Value): Promise<"OK"> {
  try {
    await primaryClient?.set(key, JSON.stringify(value))
  } catch (e) {
    console.log("REDIS ERROR:", e)
  }
  return "OK"
}

async function del(key: string): Promise<string> {
  let result
  try {
    result = await primaryClient?.del(key)
  } catch (e) {
    console.log("REDIS ERROR:", e)
  }
  return `${key} deleted: ${result}`
}

const redisCache = { get, set, del, name: "redis" }
export { get, set, del, redisCache }
