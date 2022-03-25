/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US"
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development"
  },
  publicRuntimeConfig: {}
};

const sentryWebpackPluginOptions = {
  silent: true
};

module.exports = withSentryConfig(
  withPWA(nextConfig),
  sentryWebpackPluginOptions
);
