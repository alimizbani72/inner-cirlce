const path = require("path");

module.exports = {
  minecraft: {
    input: path.resolve(__dirname, "./mock-api/minecraft.swagger.json"),
    output: {
      mode: "tags-split",
      target: "./services/minecraft",
      client: "react-query",
      mock: false,
      override: {
        mutator: {
          path: "./scripts/fetcher.ts",
          name: "customInstance",
          returnType: "data",
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },

  cms: {
    input: path.resolve(__dirname, "./mock-api/cms.swagger.json"),
    output: {
      mode: "tags-split",
      target: "./services/cms",
      client: "react-query",
      mock: false,
      override: {
        mutator: {
          path: "./scripts/fetcher.ts",
          name: "customInstance",
          returnType: "data",
        },
        query: {
          useQuery: true,
          usePrefetch: true,
        },
      },
    },
  },
};
