// flags.config.js
import { configure } from "@happykit/flags/config";

configure({
  envKey: process.env.NEXT_PUBLIC_FLAGS_ENVIRONMENT_KEY,
  defaultFlags: {
    isLocal: true
  }
});
