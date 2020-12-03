const SETTING_ACTIVITIES_SUGGESTION_AMOUNT =
  "SETTING_ACTIVITIES_SUGGESTION_AMOUNT";
const SETTING_BUDDY_GROUP_SIZE = "SETTING_BUDDY_GROUP_SIZE";
const SETTING_DAY_TO_REGENERATE = "SETTING_DAY_TO_REGENERATE";
const SETTING_LANGUAGE = "SETTING_LANGUAGE";
const SETTING_USERS_TO_IGNORE = "SETTING_USERS_TO_IGNORE";
const SETTING_REGENERATE = "SETTING_REGENERATE";
const SETTING_UTC_OFFSET = "SETTING_UTC_OFFSET";

const LATEST_GROUPS_AMOUNT = 5;
const MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP = 20;

const INTEGER_SETTINGS = [
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
  SETTING_BUDDY_GROUP_SIZE,
  SETTING_DAY_TO_REGENERATE,
  SETTING_UTC_OFFSET,
];

const DEFAULT_SETTINGS = {
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT: 3,
  SETTING_BUDDY_GROUP_SIZE: 2,
  SETTING_DAY_TO_REGENERATE: 1,
  SETTING_LANGUAGE: "en",
  SETTING_USERS_TO_IGNORE: "",
  SETTING_UTC_OFFSET: 1,
};

const ACTIONS = [
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
  SETTING_BUDDY_GROUP_SIZE,
  SETTING_DAY_TO_REGENERATE,
  SETTING_LANGUAGE,
  SETTING_REGENERATE,
  SETTING_USERS_TO_IGNORE,
  SETTING_UTC_OFFSET,
];

module.exports = {
  ACTIONS,
  DEFAULT_SETTINGS,
  INTEGER_SETTINGS,
  LATEST_GROUPS_AMOUNT,
  MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP,
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
  SETTING_BUDDY_GROUP_SIZE,
  SETTING_DAY_TO_REGENERATE,
  SETTING_LANGUAGE,
  SETTING_REGENERATE,
  SETTING_USERS_TO_IGNORE,
  SETTING_UTC_OFFSET,
};