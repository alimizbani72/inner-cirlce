const { execSync } = require("child_process");
const dotenv = require("dotenv");
const envPath = require("path");

dotenv.config({ path: envPath.resolve(__dirname, ".env") });

const endpoints = [
  {
    name: "minecraft",
    url: `${
      process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || "https://staging-minecraft.innercircle-chainmind.com/"
    }apidocs/openapi.yaml`,
  },
  {
    name: "cms",
    url: `${process.env.NEXT_PUBLIC_CMS_ENDPOINT || "https://cms.innercircle-chainmind.com/"}custom-api-docs/specs`,
  },
];

endpoints.forEach((endpoint) => {
  const openapiCommand = `bun run openapi-rq -i  ${endpoint.url} -o src/services/${endpoint.name} --request request.ts --format biome --lint biome --operationId --enums typescript`;
  try {
    execSync(openapiCommand, { stdio: "inherit" });
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(`Successfully generated API client for ${endpoint.name}`);
  } catch (error) {
    console.error(`Error executing code generation script for ${endpoint.name}:`, error);
    process.exit(1);
  }
});
