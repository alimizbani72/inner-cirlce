import fs from 'fs';
import path from 'path';

function loadTranslations(dir: string): any {
  let translations: any = {};
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      translations[item] = loadTranslations(fullPath);
    } else if (item.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
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
  const PROJECT_ROOT = path.join(__dirname, '..');
  const LANGS_DIR = path.join(PROJECT_ROOT, 'locales', 'langs');
  let langDir: string;

  if (lang === 'en') {
    langDir = path.join(LANGS_DIR, 'en');
  } else {
    langDir = path.join(LANGS_DIR, 'translated', lang);
  }

  const outputFile = path.join(LANGS_DIR, 'merged', `${lang}.json`);

  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (!fs.existsSync(langDir)) {
    console.warn(`Language directory ${langDir} does not exist. Creating empty translation file.`);
    fs.writeFileSync(outputFile, JSON.stringify({}, null, 2), 'utf8');
    return;
  }

  const translations = loadTranslations(langDir);

  fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`Built ${outputFile}`);
}

function buildAllLanguages() {
  const PROJECT_ROOT = path.join(__dirname, '..');
  const LANGS_DIR = path.join(PROJECT_ROOT, 'locales', 'langs');
  const translatedDir = path.join(LANGS_DIR, 'translated');
  if (!fs.existsSync(translatedDir)) {
    fs.mkdirSync(translatedDir, { recursive: true });
  }

  const languages = [
    'en',
    ...fs
      .readdirSync(translatedDir)
      .filter((dir) => fs.statSync(path.join(translatedDir, dir)).isDirectory()),
  ];

  languages.forEach((lang) => {
    buildLanguage(lang);
  });
}

buildAllLanguages();
