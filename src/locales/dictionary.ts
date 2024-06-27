import type { Dictionary } from "@/lib/features/dictionary/dicSlice";
import "server-only";

type DictionaryLoader = {
  [key: string]: () => Promise<Dictionary>;
};

const dictionaries: DictionaryLoader = {
  bn: () => import("./langs/bn.json").then((module) => module.default),
  de: () => import("./langs/de.json").then((module) => module.default),
  en: () => import("./langs/en.json").then((module) => module.default),
  es: () => import("./langs/es.json").then((module) => module.default),
  fr: () => import("./langs/fr.json").then((module) => module.default),
  he: () => import("./langs/he.json").then((module) => module.default),
  hi: () => import("./langs/hi.json").then((module) => module.default),
  ja: () => import("./langs/ja.json").then((module) => module.default),
  ko: () => import("./langs/ko.json").then((module) => module.default),
  mn: () => import("./langs/mn.json").then((module) => module.default),
  pt: () => import("./langs/pt.json").then((module) => module.default),
  ru: () => import("./langs/ru.json").then((module) => module.default),
  sv: () => import("./langs/sv.json").then((module) => module.default),
  th: () => import("./langs/th.json").then((module) => module.default),
  tr: () => import("./langs/tr.json").then((module) => module.default),
  vi: () => import("./langs/vi.json").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    throw new Error(`No dictionary available for locale ${locale}`);
  }
  return dictionaries[locale]();
};
