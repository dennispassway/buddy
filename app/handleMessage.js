const {
  DEFAULT_SETTINGS,
  SETTING_DAY_TO_REGENERATE,
  SETTING_UTC_OFFSET,
} = require("./constants");
const { getLatestGroups, getSettings } = require("../database");
const { matchNewGroups } = require("./matchNewGroups");

async function handleMessage({ client }) {
  try {
    const settings = await getSettings();

    const dayToRegenerate =
      settings[SETTING_DAY_TO_REGENERATE] ||
      DEFAULT_SETTINGS[SETTING_DAY_TO_REGENERATE];

    const utcOffset =
      settings[SETTING_UTC_OFFSET] || DEFAULT_SETTINGS[SETTING_UTC_OFFSET];

    const todayDate = getUTCDateAt9Am(null, utcOffset);

    if (todayDate.getDay() !== dayToRegenerate) {
      return; // We're not on the regeneration day
    }

    const groups = await getLatestGroups();

    if (!groups.length) {
      console.log(`No groups available, regenerating.`);
      return matchNewGroups(client);
    }

    const latestGroupCreation = groups[0].createdAt;

    if (!latestGroupCreation) {
      throw new Error(`No latest group creation date available...`);
    }

    const latestGroupCreationDate = getUTCDateAt9Am(
      latestGroupCreation,
      utcOffset
    );
    const timeSinceLastCreation =
      todayDate.getTime() - latestGroupCreationDate.getTime();

    if (
      timeSinceLastCreation >= process.env.REGENERATE_INTERVAL_IN_MILLISECONDS
    ) {
      return matchNewGroups(client);
    }
  } catch (error) {
    console.error(error); /* @TODO: sentry */
  }
}

function getUTCDateAt9Am(date, offset = 0) {
  const d = date ? new Date(date) : new Date();
  d.setUTCHours(9 + offset);
  d.setUTCMinutes(0);
  d.setUTCSeconds(0);
  d.setUTCMilliseconds(0);
  return d;
}

module.exports = { handleMessage };
