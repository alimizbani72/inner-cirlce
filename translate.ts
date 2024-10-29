import fs from "fs";
import path from "path";
import crypto from "crypto";
import OpenAI from "openai";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const LOCALES_DIR = path.join(__dirname, "src", "locales");
const LANGS_DIR = path.join(LOCALES_DIR, "langs");
const EN_DIR = path.join(LANGS_DIR, "en");
const TRANSLATED_DIR = path.join(LANGS_DIR, "translated");
const HASH_STORE_DIR = path.join(LOCALES_DIR, "hashes");
const CACHE_DIR = path.join(LOCALES_DIR, "caches");

// Ensure the hashes and caches directories exist
if (!fs.existsSync(HASH_STORE_DIR)) {
  fs.mkdirSync(HASH_STORE_DIR, { recursive: true });
}

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const TARGET_LANGUAGES = ["bn", "de", "es", "fr", "he", "hi", "ja", "ko", "mn", "pt", "ru", "sv", "th", "tr", "vi", "fi", "no"];

interface HashStore {
  [relativePath: string]: string;
}

interface TranslationCache {
  [sourceText: string]: string;
}

async function translateFiles(currentDir = "") {
  const enDir = path.join(EN_DIR, currentDir);
  const files = fs.readdirSync(enDir);

  // Load hash store
  const hashStoreFilePath = path.join(HASH_STORE_DIR, "hash_store.json");
  let hashStore: HashStore = {};

  if (fs.existsSync(hashStoreFilePath)) {
    hashStore = JSON.parse(fs.readFileSync(hashStoreFilePath, "utf8"));
  }

  for (const file of files) {
    const enFilePath = path.join(enDir, file);
    const stat = fs.statSync(enFilePath);

    if (stat.isDirectory()) {
      await translateFiles(path.join(currentDir, file));
    } else if (file.endsWith(".json")) {
      const relativePath = path.join(currentDir, file);
      const fileHash = computeFileHash(enFilePath);

      if (hashStore[relativePath] !== fileHash) {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(`Translating ${relativePath}...`);

        // Read the English JSON content
        const enContent = JSON.parse(fs.readFileSync(enFilePath, "utf8"));

        // Translate the content for each target language
        for (const targetLanguage of TARGET_LANGUAGES) {
          await translateAndWriteFile(enContent, relativePath, targetLanguage);
        }

        // Update hash store
        hashStore[relativePath] = fileHash;
      } else {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log(`Skipping ${relativePath}; no changes detected.`);
      }
    }
  }

  // Save the updated hash store
  fs.writeFileSync(hashStoreFilePath, JSON.stringify(hashStore, null, 2), "utf8");
}

function computeFileHash(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf8");
  return crypto.createHash("md5").update(content).digest("hex");
}

async function translateAndWriteFile(enContent: any, relativePath: string, targetLanguage: string) {
  // Load translation cache for the target language
  const cacheFilePath = path.join(CACHE_DIR, `translation_cache_${targetLanguage}.json`);
  let translationCache: TranslationCache = {};

  if (fs.existsSync(cacheFilePath)) {
    translationCache = JSON.parse(fs.readFileSync(cacheFilePath, "utf8"));
  }

  // Collect strings to translate
  const { collectedStrings } = collectStrings(enContent);

  // Prepare strings to translate, excluding those already in the cache
  const stringsToTranslate = collectedStrings.filter((s) => !(s in translationCache));

  // Translate strings
  if (stringsToTranslate.length > 0) {
    const translations = await translateStrings(stringsToTranslate, targetLanguage);

    // Update translation cache
    translations.forEach(({ source, translation }) => {
      translationCache[source] = translation;
    });

    // Save updated translation cache
    fs.writeFileSync(cacheFilePath, JSON.stringify(translationCache, null, 2), "utf8");
  }

  // Build translated content
  const translatedContent = applyTranslations(enContent, translationCache);

  // Write the translated content to the target language file
  const targetFilePath = path.join(TRANSLATED_DIR, targetLanguage, relativePath);
  const targetDir = path.dirname(targetFilePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(targetFilePath, JSON.stringify(translatedContent, null, 2), "utf8");
}

interface StringPaths {
  [sourceText: string]: Array<{ obj: any; key: string }>;
}

function collectStrings(obj: any): { collectedStrings: string[]; stringPaths: StringPaths } {
  const collectedStrings: string[] = [];
  const stringPaths: StringPaths = {};

  function traverse(currentObj: any) {
    for (const key in currentObj) {
      const value = currentObj[key];
      if (typeof value === "string") {
        if (!stringPaths[value]) {
          collectedStrings.push(value);
          stringPaths[value] = [];
        }
        stringPaths[value].push({ obj: currentObj, key });
      } else if (typeof value === "object" && value !== null) {
        traverse(value);
      }
    }
  }

  traverse(obj);
  return { collectedStrings, stringPaths };
}

function applyTranslations(enContent: any, translationCache: TranslationCache): any {
  function traverse(currentObj: any) {
    for (const key in currentObj) {
      const value = currentObj[key];
      if (typeof value === "string") {
        currentObj[key] = translationCache[value] || value;
      } else if (typeof value === "object" && value !== null) {
        traverse(currentObj[key]);
      }
    }
  }

  const translatedContent = JSON.parse(JSON.stringify(enContent)); // Deep copy
  traverse(translatedContent);
  return translatedContent;
}

async function translateStrings(
  strings: string[],
  targetLanguage: string
): Promise<{ source: string; translation: string }[]> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const batchSize = 50; // Reduced batch size
  const translations: { source: string; translation: string }[] = [];

  for (let i = 0; i < strings.length; i += batchSize) {
    const batchStrings = strings.slice(i, i + batchSize);

    // Escape placeholders to prevent them from being translated
    const escapedStrings = batchStrings.map((s) => escapePlaceholders(s));

    const gptPrompt = `
    You will be provided with a numbered list of sentences or words in English, and your task is to translate them into ${targetLanguage}.
    Ensure that you provide one translation per input line, maintaining the same numbering.
    Do not combine or split sentences.
    Ensure consistency with previously translated terms, especially for recurring product features.
    Do not translate crypto terminology, arithmetic symbols, or neologisms.
    Do not translate text enclosed in double curly braces (e.g., {{placeholder}}).
    Provide the translations in the same order as the input, maintaining the same numbering, and only provide the translations.
    Do not include any additional text, explanations, or formatting.
    `;

    // Prepare the messages for the API call
    const messages = [
      {
        role: "system",
        content: gptPrompt,
      },
      {
        role: "user",
        content: escapedStrings.map((s, idx) => `${idx + 1}. ${s}`).join("\n"),
      },
    ];

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: messages as any,
        temperature: 0.3,
        top_p: 1,
      });

      const translatedText = response?.choices?.[0]?.message?.content?.trim();

      if (!translatedText) {
        console.error("No translated text returned by the API.");
        throw new Error("No translated text returned by the API.");
      }

      const translatedLines = translatedText
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter((line) => line.length > 0);

      // Remove numbering if present
      const cleanedTranslatedLines = translatedLines.map((line) => {
        // Remove leading numbers and periods (e.g., "1. Translation")
        const cleanedLine = line.replace(/^\d+\.\s*/, "");
        // Remove surrounding quotes
        if (cleanedLine.startsWith('"') && cleanedLine.endsWith('"')) {
          return cleanedLine.slice(1, -1);
        }
        return cleanedLine;
      });

      if (cleanedTranslatedLines.length !== batchStrings.length) {
        console.error("Mismatch between number of source strings and translations.");
        console.error("Source strings:", batchStrings);
        console.error("Translated lines:", cleanedTranslatedLines);
        console.error("Full translated text:", translatedText);
        throw new Error("Mismatch between number of source strings and translations.");
      }

      // Restore placeholders in translations
      for (let j = 0; j < batchStrings.length; j++) {
        const translation = unescapePlaceholders(cleanedTranslatedLines[j]);
        translations.push({ source: strings[i + j], translation });
      }
    } catch (error) {
      console.error("Error during translation:", error);
      throw error;
    }
  }

  return translations;
}

function escapePlaceholders(text: string): string {
  return text.replace(/\{\{(.*?)\}\}/g, "[[[$1]]]");
}

function unescapePlaceholders(text: string): string {
  return text.replace(/\[\[\[(.*?)\]\]\]/g, "{{$1}}");
}

async function translateAll() {
  await translateFiles();
}

translateAll().catch((error) => console.error(error));
