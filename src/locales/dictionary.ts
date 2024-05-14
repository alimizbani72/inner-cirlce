import type { Dictionary } from "@/lib/features/dictionary/dicSlice";
import "server-only";

type DictionaryLoader = {
  [key: string]: () => Promise<Dictionary>;
};

const dictionaries: DictionaryLoader = {
  en: () => import("./langs/en.json").then((module) => module.default),
  de: () => import("./langs/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    throw new Error(`No dictionary available for locale ${locale}`);
  }
  return dictionaries[locale]();
};
