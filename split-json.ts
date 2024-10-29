import fs from "fs";
import path from "path";

// Define the path to the combined en.json file
const EN_JSON_PATH = path.join(__dirname, "src", "locales", "langs", "en.json");

// Define the output directory for the split JSON files
const OUTPUT_DIR = path.join(__dirname, "src", "locales", "langs", "en");

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read the combined en.json file
const enContent = JSON.parse(fs.readFileSync(EN_JSON_PATH, "utf8"));

// Iterate over the top-level keys and write each one to a separate file
for (const key of Object.keys(enContent)) {
  const sectionContent = { [key]: enContent[key] };
  const outputFilePath = path.join(OUTPUT_DIR, `${key}.json`);

  fs.writeFileSync(outputFilePath, JSON.stringify(sectionContent, null, 2), "utf8");
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`Created ${outputFilePath}`);
}
