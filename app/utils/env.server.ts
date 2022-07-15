function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENV: process.env.SENTRY_ENV,
    BOT_GITHUB_TOKEN: process.env.BOT_GITHUB_TOKEN,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_CA: process.env.REDIS_CA,
    REFRESH_CACHE_SECRET: process.env.REFRESH_CACHE_SECRET,
    STATUSPAGE_API_KEY: process.env.STATUSPAGE_API_KEY,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  }
}

type ENV = ReturnType<typeof getEnv>

/**
 * these values are exposed on window, don't put secrets here
 */
function getPublicEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    /**
     * the url origin, e.g. https://developers.onflow.org or http://localhost:3000
     */
    ORIGIN: process.env.ORIGIN,
  }
}

type PUBLIC_ENV = ReturnType<typeof getPublicEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: PUBLIC_ENV
  interface Window {
    ENV: PUBLIC_ENV
  }
}

export { getEnv, getPublicEnv }
export type { ENV, PUBLIC_ENV }
