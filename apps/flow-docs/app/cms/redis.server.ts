
import { createClient, RedisClientType, RedisClientOptions } from "redis";
import { getRequiredServerEnvVar } from "./helpers";

declare global {
  // This prevents us from making multiple connections to the db when the
  // require cache is cleared.
  // eslint-disable-next-line
  var primaryClient: RedisClientType | undefined
}

const REDIS_URL = getRequiredServerEnvVar("REDIS_URL");

const primary = new URL(REDIS_URL);
let primaryClient: RedisClientType | null = null

primaryClient = createRedisClient('primaryClient', {
  url: primary.toString()
})

function createRedisClient(
  name: 'primaryClient',
  options: RedisClientOptions,
): RedisClientType {
  let client = global[name]
  if (!client) {
    const url = new URL(options.url ?? 'http://no-redis-url.example.com?weird')
    console.log(`Setting up redis client to ${url.host}`)
    // eslint-disable-next-line no-multi-assign
    client = global[name] = createClient({
      url: options.url
    })

    client.connect()
    
    client.on('error', (error: string) => {
      console.error(`REDIS ${name} (${url.host}) ERROR:`, error)
    })
  }
  return client
}


async function get<Value = unknown>(key: string): Promise<Value | null> {
  let result;  
  try {
    result = await primaryClient?.get(key);
   
  } catch(e) {
    console.log('REDIS ERROR:', e)
  } 

  return result ? result = (JSON.parse(result) as Value) : null   

}

async function set<Value>(key: string, value: Value): Promise<"OK"> {
  try {
    await primaryClient?.set(
      key,
      JSON.stringify(value)
    );
  } catch(e) {
    console.log("REDIS ERROR:", e)
  }
    return "OK"
}

async function del(key: string): Promise<string> {
  let result;
  try {
    result =  await primaryClient?.del(key);
  } catch(e) {
    console.log('REDIS ERROR:', e) 
  }
  return (`${key} deleted: ${result}`)
}

const redisCache = { get, set, del, name: "redis" };
export { get, set, del, redisCache };
