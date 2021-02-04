/*
  Sources:
  https://miro.com/blog/ice-breaker-questions-for-team/
  https://www.donut.com/social-watercooler-connections/
*/

import { SETTING_LANGUAGE, DEFAULT_SETTINGS } from 'app/constants';
import en from 'content/en';
import type { Settings, TranslateContent, TranslateKey } from 'app/types';

export function translate(key: TranslateKey) {
  /* @TODO: language getSettings should not be async, now changing language does not work */
  const settings: Settings = {}; // await getSettings()
  const language = settings[SETTING_LANGUAGE] || DEFAULT_SETTINGS[SETTING_LANGUAGE];

  const languages: { [key: string]: TranslateContent } = {
    en,
  };

  const contentInLanguage = languages[language];

  if (!contentInLanguage[key]) {
    console.warn(`Could not find translation for ${key}/${language}`);
  }

  return contentInLanguage[key];
}
