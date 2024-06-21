const { execSync } = require("child_process");
const dotenv = require("dotenv");
const envPath = require("path");

const resolvePathJoin = (baseUrl: string, ...paths: string[]): string => {
  try {
    // Normalize the base URL to ensure it ends with a slash.
    if (!baseUrl.endsWith("/")) {
      // biome-ignore lint/style/noParameterAssign: <explanation>
      baseUrl += "/";
    }

    // Join all paths with slashes, removing any redundant slashes.
    const fullPath = paths.join("/").replace(/\/+/g, "/");

    // Create a new URL object with the full path and base URL.
    const combinedUrl = new URL(fullPath, baseUrl);

    // Return the absolute URL as a string.
    return combinedUrl.href;
  } catch (error) {
    console.error("Invalid URL", error);
    throw new Error("Could not resolve the URL.");
  }
};

dotenv.config({ path: envPath.resolve(__dirname, ".env") });

const endpoints = [
  {
    name: "minecraft",
    url: resolvePathJoin(
      process.env.NEXT_PUBLIC_MINECRAFT_ENDPOINT || "https://staging-minecraft.innercircle-chainmind.com/",
      "/apidocs/openapi.yaml"
    ),
    command: "",
  },
  {
    name: "cms",
    url: resolvePathJoin(
      process.env.NEXT_PUBLIC_CMS_ENDPOINT || "https://cms.innercircle-chainmind.com/",
      "/custom-api-docs/specs"
    ),
    command: ` --base ${resolvePathJoin(
      process.env.NEXT_PUBLIC_CMS_ENDPOINT || "https://cms.innercircle-chainmind.com/",
      "/api"
    )}`,
  },
];

endpoints.forEach((endpoint) => {
  const openapiCommand = `bun run openapi-rq -i ${endpoint.url} -o src/services/${endpoint.name} ${endpoint.command} --request request.ts --format biome --lint biome --operationId --enums typescript`;
  try {
    execSync(openapiCommand, { stdio: "inherit" });
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(`Successfully generated API client for ${endpoint.name}`);
  } catch (error) {
    console.error(`Error executing code generation script for ${endpoint.name}:`, error);
    process.exit(1);
  }
});
