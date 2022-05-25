
import { createClient } from "redis";
import { getRequiredServerEnvVar } from "./helpers";

const REDIS_URL = getRequiredServerEnvVar("REDIS_URL");

const primary = new URL(REDIS_URL);

const primaryClient = createClient({
  url: primary.toString()
})

primaryClient.connect()

primaryClient.on("error", (error: string) => {
  console.error(`REDIS (${primary.host}) ERROR:`, error);
});

async function get<Value = unknown>(key: string): Promise<Value | null> {
  let result;  
  try {
    result = await primaryClient.get(key);
   
  } catch(e) {
    console.log('REDIS ERROR:', e)
  } 

  return result ? result = (JSON.parse(result) as Value) : null   

}

async function set<Value>(key: string, value: Value): Promise<"OK"> {
  try {
    await primaryClient.set(
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
    result =  await primaryClient.del(key);
  } catch(e) {
    console.log('REDIS ERROR:', e) 
  }
  return (`${key} deleted: ${result}`)
}

const redisCache = { get, set, del, name: "redis" };
export { get, set, del, redisCache };
