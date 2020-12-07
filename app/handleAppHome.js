const {
  DEFAULT_SETTINGS,
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
  SETTING_BUDDY_GROUP_SIZE,
  SETTING_DAY_TO_REGENERATE,
  SETTING_LANGUAGE,
  SETTING_REGENERATE,
  SETTING_USERS_TO_IGNORE,
  SETTING_UTC_OFFSET,
} = require("./constants");
const {
  CREATE_BUDDIES_SETTINGS,
  GENERAL_SETTINGS_TITLE,
  GREETINGS,
  HOME_INTRO,
  REGROUP_BUDDIES_TITLE,
  REGROUP_BUTTON_LABEL,
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION,
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE,
  SETTING_BUDDY_GROUP_SIZE_DESCRIPTION,
  SETTING_BUDDY_GROUP_SIZE_TITLE,
  SETTING_DAY_TO_REGENERATE_DESCRIPTION,
  SETTING_DAY_TO_REGENERATE_TITLE,
  SETTING_LANGUAGE_DESCRIPTION,
  SETTING_LANGUAGE_TITLE,
  SETTING_USERS_TO_IGNORE_DESCRIPTION,
  SETTING_USERS_TO_IGNORE_TITLE,
  SETTING_UTC_OFFSET_DESCRIPTION,
  SETTING_UTC_OFFSET_TITLE,
  translate,
} = require("./translate");
const { captureException } = require("./sentry");
const { getSettings } = require("../database");
const { randomFromArray } = require("./utils");

async function handleAppHome({ event, client }) {
  const blocks = await getBlocks({ event });

  try {
    await client.views.publish({
      user_id: event.user,
      view: { type: "home", blocks: blocks },
    });
  } catch (error) {
    captureException(error);
  }
}

async function getBlocks({ event }) {
  let settingsBlocks = [];
  const adminUsers = (process.env.ADMIN_USERS || "").split(",");

  const isAdmin = adminUsers.indexOf(event.user) > -1;

  if (isAdmin) {
    const settings = await getSettings();

    settingsBlocks = [
      {
        type: "header",
        text: { type: "plain_text", text: translate(GENERAL_SETTINGS_TITLE) },
      },
      { type: "divider" },
      select({
        action_id: SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
        description: translate(
          SETTING_ACTIVITIES_SUGGESTION_AMOUNT_DESCRIPTION
        ),
        name: translate(SETTING_ACTIVITIES_SUGGESTION_AMOUNT_TITLE),
        placeholder: "Select an option",
        settings,
        options: [1, 2, 3, 4, 5].map((v) => ({
          label: v.toString(),
          value: v.toString(),
        })),
      }),
      select({
        action_id: SETTING_LANGUAGE,
        description: translate(SETTING_LANGUAGE_DESCRIPTION),
        name: translate(SETTING_LANGUAGE_TITLE),
        placeholder: "Select an option",
        settings,
        options: [{ label: "English", value: "en" }],
      }),
      {
        type: "header",
        text: { type: "plain_text", text: translate(CREATE_BUDDIES_SETTINGS) },
      },
      { type: "divider" },
      select({
        action_id: SETTING_BUDDY_GROUP_SIZE,
        description: translate(SETTING_BUDDY_GROUP_SIZE_DESCRIPTION),
        name: translate(SETTING_BUDDY_GROUP_SIZE_TITLE),
        placeholder: "Select an option",
        settings,
        options: [1, 2, 3, 4, 5].map((v) => ({
          label: v.toString(),
          value: v.toString(),
        })),
      }),
      select({
        action_id: SETTING_USERS_TO_IGNORE,
        description: translate(SETTING_USERS_TO_IGNORE_DESCRIPTION),
        name: translate(SETTING_USERS_TO_IGNORE_TITLE),
        placeholder: "Select users",
        settings,
        type: "multi_users_select",
      }),
      {
        type: "header",
        text: { type: "plain_text", text: translate(REGROUP_BUDDIES_TITLE) },
      },
      { type: "divider" },
      select({
        action_id: SETTING_DAY_TO_REGENERATE,
        description: translate(SETTING_DAY_TO_REGENERATE_DESCRIPTION),
        name: translate(SETTING_DAY_TO_REGENERATE_TITLE),
        placeholder: "Select an option",
        settings,
        options: [
          { label: "Monday", value: "1" },
          { label: "Tuesday", value: "2" },
          { label: "Wednesday", value: "3" },
          { label: "Thursday", value: "4" },
          { label: "Friday", value: "5" },
          { label: "Saturday", value: "6" },
          { label: "Sunday", value: "0" },
        ],
      }),
      select({
        action_id: SETTING_UTC_OFFSET,
        description: translate(SETTING_UTC_OFFSET_DESCRIPTION),
        name: translate(SETTING_UTC_OFFSET_TITLE),
        placeholder: "Select an option",
        settings,
        options: [
          -12,
          -11,
          -10,
          -9,
          -8,
          -7,
          -6,
          -5,
          -4,
          -3,
          -2,
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
        ].map((v) => ({
          label: `UTC ${v > 0 ? "+" : ""}${v.toString()}`,
          value: v.toString(),
        })),
      }),
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: translate(REGROUP_BUTTON_LABEL) },
            action_id: SETTING_REGENERATE,
          },
        ],
      },
    ];
  }

  const introBlocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${randomFromArray(translate(GREETINGS))} <@${
          event.user
        }>! :wave:*`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: translate(HOME_INTRO),
      },
    },
  ];

  return !isAdmin ? introBlocks : [...introBlocks, ...settingsBlocks];
}

function select({
  action_id,
  description,
  name,
  options,
  placeholder = "",
  settings,
  type = "static_select",
  ...rest
}) {
  const settingValue = settings[action_id] || DEFAULT_SETTINGS[action_id];
  const initial_option = (options || []).find(
    ({ value }) => value === settingValue.toString()
  );

  const initial_users =
    type === "multi_users_select"
      ? settingValue && settingValue !== ""
        ? settingValue
        : []
      : null;

  return {
    type: "section",
    text: { type: "mrkdwn", text: `*${name}*\n${description}` },
    accessory: {
      action_id,
      type,
      placeholder: { type: "plain_text", text: placeholder },
      ...(initial_option
        ? { initial_option: createFromLabelValue(initial_option) }
        : {}),
      ...(initial_users ? { initial_users } : {}),
      ...(options ? { options: options.map(createFromLabelValue) } : {}),
      ...rest,
    },
  };
}

function createFromLabelValue({ label, value }) {
  return { text: { type: "plain_text", text: label }, value };
}

module.exports = { handleAppHome };
