// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
      preventFullImport: true,
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
      preventFullImport: true,
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Rule for .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  output: "standalone",
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
