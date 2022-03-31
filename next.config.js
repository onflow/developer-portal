/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const { withSentryConfig } = require("@sentry/nextjs");

// Allows authoring pages in .mdx files
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US"
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development"
  },
  experimental: {
    runtime: "nodejs"
  },
  publicRuntimeConfig: {},
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59"
          }
        ]
      }
    ];
  }
};

const sentryWebpackPluginOptions = {
  silent: true
};

module.exports = withSentryConfig(
  withPWA(withMDX(nextConfig)),
  sentryWebpackPluginOptions
);
