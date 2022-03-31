import { configure } from "@happykit/flags/config";

// See usage example with Next middleware here:
// https://github.com/vercel/examples/blob/main/edge-functions/feature-flag-split/pages/marketing/_middleware.ts

configure({
  envKey: process.env.NEXT_PUBLIC_FLAGS_ENVIRONMENT_KEY,
  endpoint: process.env.NEXT_PUBLIC_FLAGS_ENDPOINT,
});
