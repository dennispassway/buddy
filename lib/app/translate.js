"use strict";
/*
  Sources:
  https://miro.com/blog/ice-breaker-questions-for-team/
  https://www.donut.com/social-watercooler-connections/
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
var constants_1 = require("app/constants");
var en_1 = require("content/en");
function translate(key) {
    /* @TODO: language getSettings should not be async, now changing language does not work */
    var settings = {}; // await getSettings()
    var language = settings[constants_1.SETTING_LANGUAGE] || constants_1.DEFAULT_SETTINGS[constants_1.SETTING_LANGUAGE];
    var languages = {
        en: en_1.default,
    };
    var contentInLanguage = languages[language];
    if (!contentInLanguage[key]) {
        console.warn("Could not find translation for " + key + "/" + language);
    }
    return contentInLanguage[key];
}
exports.translate = translate;
