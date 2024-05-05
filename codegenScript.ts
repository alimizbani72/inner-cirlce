const { execSync } = require("child_process");
const dotenv = require("dotenv");
const envPath = require("path");

// Load environment variables
dotenv.config({ path: envPath.resolve(__dirname, ".env") });

// Define the endpoint from environment variables or use a default
const endpoint = process.env.NEXT_PUBLIC_DUBCRAFT_ENDPOINT || "https://dev-dubcraft.speax.ai/";

// Prepare the command with new options from the updated package
const openapiCommand = `npx --package @7nohe/openapi-react-query-codegen openapi-rq -i ${endpoint}apidocs/openapi.yaml -o src/services --request request.ts --format biome --lint biome --operationId --enums typescript`;

try {
  // Execute the command and inherit the standard output and error streams
  execSync(openapiCommand, { stdio: "inherit" });
} catch (error) {
  console.error("Error executing code generation script:", error);
  process.exit(1);
}
