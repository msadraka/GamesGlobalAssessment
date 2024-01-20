/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @type {import('next').NextConfig}
 */
const axios = require("axios").default;

axios.defaults.baseURL = process.env.API_PROXY;

module.exports = {
  publicRuntimeConfig: {},
  pageExtensions: ["api.js", "api.ts", "page.tsx"],
  compiler: {
    styledComponents: true,
  },
  swcMinify: false,
  images: {
    domains: [
      `${process.env.IMAGE_URL}`,
      "avatars.githubusercontent.com",
      "i.pravatar.cc",
    ],
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: [
      "pages",
      "utils",
      "components",
      "containers",
      "constants",
      "helpers",
      "hooks",
      "axioses",
      "queries",
      "utils",
      "themes",
    ], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  webpack(config) {
    Object.assign(config.experiments, { topLevelAwait: true });
    config.module.rules.push({
      test: [
        /(components|containers|constants|helpers|hooks|axioses|queries|utils|themes)\/index.ts/i,
      ],
      sideEffects: false,
    });
    return config;
  },
};
