import { configure } from "@happykit/flags/config";

configure({
  envKey: process.env.NEXT_PUBLIC_FLAGS_ENVIRONMENT_KEY,
  endpoint: process.env.NEXT_PUBLIC_FLAGS_ENDPOINT
});
