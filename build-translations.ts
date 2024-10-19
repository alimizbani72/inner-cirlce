import fs from "fs";
import path from "path";

function loadTranslations(dir: string): any {
  let translations: any = {};
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      translations[item] = loadTranslations(fullPath);
    } else if (item.endsWith(".json")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const json = JSON.parse(content);
      translations = deepMerge(translations, json);
    }
  }

  return translations;
}

function deepMerge(target: any, source: any): any {
  for (const key in source) {
    if (source[key] instanceof Object && !(source[key] instanceof Array)) {
      target[key] = target[key] || {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function buildLanguage(lang: string) {
  const LANGS_DIR = path.join(__dirname, "src", "locales", "langs");
  let langDir: string;

  if (lang === "en") {
    // For English, source directory is EN_DIR
    langDir = path.join(LANGS_DIR, "en");
  } else {
    // For other languages, source directory is TRANSLATED_DIR/<lang>
    langDir = path.join(LANGS_DIR, "translated", lang);
  }

  const outputFile = path.join(LANGS_DIR, "merged", `${lang}.json`);

  if (!fs.existsSync(langDir)) {
    console.error(`Language directory ${langDir} does not exist.`);
    return;
  }

  const translations = loadTranslations(langDir);

  // Ensure the output directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), "utf8");
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`Built ${outputFile}`);
}

function buildAllLanguages() {
  const LANGS_DIR = path.join(__dirname, "src", "locales", "langs");
  const translatedDir = path.join(LANGS_DIR, "translated");

  // Get list of languages from the translated directory
  const languages = [
    "en",
    ...fs.readdirSync(translatedDir).filter((dir) => fs.statSync(path.join(translatedDir, dir)).isDirectory()),
  ];

  languages.forEach((lang) => {
    buildLanguage(lang);
  });
}

buildAllLanguages();
