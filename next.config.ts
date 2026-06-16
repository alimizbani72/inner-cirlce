import type { NextConfig } from "next";

type NextConfigWithEslint = NextConfig & {
  eslint?: {
    ignoreDuringBuilds?: boolean;
  };
};

const nextConfig: NextConfigWithEslint = {
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
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["@react-pdf/renderer"],
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  poweredByHeader: false,
  // trailingSlash: true,
  basePath: "",
  output: "standalone",
  productionBrowserSourceMaps: false,
};

export default nextConfig;
