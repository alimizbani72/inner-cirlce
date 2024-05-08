import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

type Icon = { properties: { name: string } };

const camelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

const generateIconTypes = async (file: string): Promise<void> => {
  try {
    const filePath = `src/components/icons/${file}.json`;
    const data = await readFile(filePath, { encoding: "utf8" });
    const icons: { icons: Icon[] } = JSON.parse(data);
    const names = icons.icons.map((icon, idx) => `${idx !== 0 ? "\n\t" : ""}"${icon.properties.name}"`);

    const content = `
const ${camelize(file)}Names = [
    ${names.join(",")}
] as const;

export type ${camelize(file)}Type = typeof ${camelize(file)}Names[number];
`;

    await writeFile(`src/components/icons/${camelize(file)}Names.ts`, content);
  } catch (error) {
    console.error(`Error generating icon types: ${error}`);
  }
};

const files = ["Icons"];

files.forEach((file) => {
  generateIconTypes(file);
});
