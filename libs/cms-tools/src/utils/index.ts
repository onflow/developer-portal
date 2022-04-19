import type { getEnv } from './env.server';

function getRequiredEnvVarFromObj(
  obj: Record<string, string | undefined>,
  key: string,
  // eslint-disable-next-line
  devValue: string = `${key}-dev-value`
) {
  let value = devValue;
  const envVal = obj[key];
  if (envVal) {
    value = envVal;
  } else if (obj['NODE_ENV'] === 'production') {
    throw new Error(`${key} is a required env variable`);
  }
  return value;
}

function getRequiredServerEnvVar(key: string, devValue?: string) {
  return getRequiredEnvVarFromObj(process.env, key, devValue);
}

function getRequiredGlobalEnvVar(
  key: keyof ReturnType<typeof getEnv>,
  devValue?: string
) {
  return getRequiredEnvVarFromObj(ENV, key, devValue);
}

export { getRequiredServerEnvVar, getRequiredGlobalEnvVar };
