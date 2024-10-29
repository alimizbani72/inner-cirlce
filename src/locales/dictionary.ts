import type { Dictionary } from "@/lib/features/dictionary/dicSlice";
import "server-only";

type DictionaryLoader = {
  [key: string]: () => Promise<Dictionary>;
};

const languages = [
  "en",
  "bn",
  "de",
  "es",
  "fr",
  "he",
  "hi",
  "ja",
  "ko",
  "mn",
  "pt",
  "ru",
  "sv",
  "th",
  "tr",
  "vi",
  "fi",
  "no",
];

let dictionaries: DictionaryLoader;

if (process.env.NODE_ENV === "production") {
  dictionaries = languages.reduce((acc, lang) => {
    acc[lang] = () => import(`./langs/merged/${lang}.json`).then((module) => module.default);
    return acc;
  }, {} as DictionaryLoader);
} else {
  const enFiles = (require as any).context("./langs/en", true, /\.json$/);
  const enTranslations = enFiles.keys().reduce((acc: any, key: any) => {
    const translation = enFiles(key);
    return { ...acc, ...translation };
  }, {});

  dictionaries = {
    en: () => Promise.resolve(enTranslations),
  };
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    throw new Error(`No dictionary available for locale ${locale}`);
  }
  return dictionaries[locale]();
};

export const availableLanguages = languages;
