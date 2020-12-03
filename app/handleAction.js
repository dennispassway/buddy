const {
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
  SETTING_BUDDY_GROUP_SIZE,
  SETTING_DAY_TO_REGENERATE,
  SETTING_LANGUAGE,
  SETTING_REGENERATE,
  SETTING_USERS_TO_IGNORE,
  SETTING_UTC_OFFSET,
} = require("./constants");
const { updateSettingInDatabase } = require("../database");
const { matchNewGroups } = require("./matchNewGroups");

async function handleAction({ ack, client, payload }) {
  try {
    const actionsToSaveInSettings = [
      SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
      SETTING_BUDDY_GROUP_SIZE,
      SETTING_DAY_TO_REGENERATE,
      SETTING_LANGUAGE,
      SETTING_USERS_TO_IGNORE,
      SETTING_UTC_OFFSET,
    ];

    const { action_id, selected_option, selected_users, type } = payload;

    if (action_id === SETTING_REGENERATE) {
      await ack();
      return matchNewGroups(client);
    }

    if (actionsToSaveInSettings.indexOf(action_id) > -1) {
      await ack();

      return await updateSettingInDatabase(
        action_id,
        type === "multi_users_select" ? selected_users : selected_option.value
      );
    }

    throw new Error(`Unknown action: ${action_id}`);
  } catch (error) {
    console.error(error); /* @TODO: Sentry */
  }
}

module.exports = { handleAction };
