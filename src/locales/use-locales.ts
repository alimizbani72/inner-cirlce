"use client";

import { useCallback, useMemo } from "react";

import { allLangs, defaultLang } from "./config-lang";
import { useAppSelector } from "@/lib/hooks";
import { selectDict, selectLang } from "@/lib/features/dictionary/dicSlice";
import type { DictionaryJson, NestedKeyOf } from "./types";

// ----------------------------------------------------------------------

export function useLocales() {
  const langStorage = useAppSelector(selectLang);

  const currentLang = allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  return {
    allLangs,
    currentLang,
  };
}

// ----------------------------------------------------------------------

export function useTranslate() {
  const dict = useAppSelector(selectDict) as DictionaryJson;

  const getNestedValue = useCallback(
    <T extends object, K extends NestedKeyOf<T>>(obj: T, key: K): string =>
      key.split(".").reduce((acc, part) => acc && (acc as any)[part], obj as unknown) as string,
    []
  );

  const replacePlaceholders = useCallback((str: string, values: Record<string, any>): string => {
    return str.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? `{{${key}}}`);
  }, []);

  const t = useMemo(
    () =>
      <K extends NestedKeyOf<DictionaryJson>>(input: K, values?: Record<string, any>) => {
        const translatedString = getNestedValue(dict, input);
        return values ? replacePlaceholders(translatedString, values) : translatedString;
      },
    [dict, getNestedValue, replacePlaceholders]
  );

  return {
    t,
  };
}
