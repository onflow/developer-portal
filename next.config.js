/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true
};

const sentryWebpackPluginOptions = {
  silent: true // Suppresses all logs
};

module.exports = withSentryConfig(
  withPWA(
    {
      ...nextConfig,
      pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development"
      }
    },
    sentryWebpackPluginOptions
  )
);
