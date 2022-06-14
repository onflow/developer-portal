import Redis from "ioredis"
import { getRequiredServerEnvVar } from "./helpers"

declare global {
  // This prevents us from making multiple connections to the db when the
  // require cache is cleared.
  // eslint-disable-next-line
  var primaryClient: Redis | undefined
}

const REDIS_URL = getRequiredServerEnvVar("REDIS_URL")

const primaryURL = new URL(REDIS_URL)
let primaryClient: Redis | null = null

primaryClient = createRedisClient("primaryClient", primaryURL.toString())

// Create Redis client instance
function createRedisClient(name: "primaryClient", url: string): Redis {
  let client = global[name]
  if (!client) {
    const dbURL = new URL(url ?? "http://no-redis-url.example.com?weird")

    console.log(`Setting up redis client to ${dbURL.host}`)

    client = global[name] = new Redis(REDIS_URL, {
      lazyConnect: true,
      retryStrategy: () => 1000,
    })
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
