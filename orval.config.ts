const { CMS_API_DOCS, CMS_BASE_URL_ENDPOINT, MINECRAFT_API_DOCS } = require('./consts');

module.exports = {
  minecraft: {
    input: MINECRAFT_API_DOCS,
    output: {
      mode: 'tags-split',
      target: './services/minecraft',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './scripts/fetcher.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
  cms: {
    input: CMS_API_DOCS,
    output: {
      mode: 'tags-split',
      target: './services/cms',
      client: 'react-query',
      mock: false,
      override: {
        query: {
          useQuery: true,
          usePrefetch: true,
        },
      },
      baseUrl: CMS_BASE_URL_ENDPOINT,
    },
  },
};
