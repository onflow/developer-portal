import type { getEnv } from "../env.server"

function getRequiredEnvVarFromObj(
  obj: Record<string, string | undefined>,
  key: string,
  devValue?: string
) {
  const envVal = obj[key]
  if (envVal) {
    return envVal
  } else if (devValue != null && obj["NODE_ENV"] !== "production") {
    return devValue
  }
  throw new Error(`${key} is a required env variable`)
}

function getRequiredServerEnvVar(key: string, devValue?: string) {
  return getRequiredEnvVarFromObj(process.env, key, devValue)
}

function getRequiredGlobalEnvVar(
  key: keyof ReturnType<typeof getEnv>,
  devValue?: string
) {
  return getRequiredEnvVarFromObj(ENV, key, devValue)
}

export { getRequiredServerEnvVar, getRequiredGlobalEnvVar }
