const {
  ACTIVITIES_INTRO,
  ACTIVITIES,
  CURRENT_GROUPS_ARE,
  GREETINGS,
  NO_GROUPS,
  NOT_IN_GROUP,
  QUESTION_INTRO,
  QUESTIONS,
  SOMETHING_WENT_WRONG,
  UNKNOWN_COMMAND,
  YOU_CAN_CHAT_WITH_THEM_HERE,
  YOUR_ARE_BUDDIES_WITH,
  translate,
} = require("./translate");
const { captureException } = require("./sentry");
const {
  getGroupForMember,
  getLatestGroups,
  getSettings,
} = require("../database");
const { randomFromArray } = require("./utils");
const {
  SETTING_ACTIVITIES_SUGGESTION_AMOUNT,
  DEFAULT_SETTINGS,
} = require("./constants");

async function handleUnknown({ channel_id, client, user_id }) {
  const blocks = translate(UNKNOWN_COMMAND);

  return client.chat.postEphemeral({
    channel: channel_id,
    blocks,
    user: user_id,
  });
}

async function handleActivity({ say }) {
  const settings = await getSettings();
  const amount =
    settings[SETTING_ACTIVITIES_SUGGESTION_AMOUNT] ||
    DEFAULT_SETTINGS[SETTING_ACTIVITIES_SUGGESTION_AMOUNT];

  const activities = randomFromArray(translate(ACTIVITIES), amount).join(
    "\n• "
  );

  return say({
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: translate(ACTIVITIES_INTRO) },
      },
      { type: "section", text: { type: "mrkdwn", text: `• ${activities}` } },
    ],
  });
}

async function handleQuestion({ say }) {
  const question = randomFromArray(translate(QUESTIONS));
  return say({
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: translate(QUESTION_INTRO) },
      },
      { type: "section", text: { type: "mrkdwn", text: `*${question}*` } },
    ],
  });
}

async function handleGroup({ channel_id, client, user_id }) {
  const group = await getGroupForMember(user_id);

  if (!group) {
    return client.chat.postEphemeral({
      channel: channel_id,
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: translate(NOT_IN_GROUP) },
        },
      ],
      user: user_id,
    });
  }

  const { channel, members } = group;

  const membersString = members
    .filter((id) => id !== user_id)
    .map((member) => `<@${member}>`)
    .join(", ");

  return client.chat.postEphemeral({
    channel: channel_id,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${randomFromArray(
            translate(GREETINGS)
          )} <@${user_id}>! :wave:`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${translate(YOUR_ARE_BUDDIES_WITH)} ${membersString}.`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${translate(YOU_CAN_CHAT_WITH_THEM_HERE)} <#${channel}>.`,
        },
      },
    ],
    user: user_id,
  });
}

async function handleGroups({ channel_id, client, user_id }) {
  const groups = await getLatestGroups(1);

  if (!groups || groups.length === 0) {
    return client.chat.postEphemeral({
      channel: channel_id,
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: translate(NO_GROUPS) },
        },
      ],
      user: user_id,
    });
  }

  return client.chat.postEphemeral({
    channel: channel_id,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${randomFromArray(
            translate(GREETINGS)
          )} <@${user_id}>! :wave:`,
        },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: translate(CURRENT_GROUPS_ARE) },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `• ${groups
            .map(({ members }) =>
              members.map((member) => `<@${member}>`).join(", ")
            )
            .join("\n• ")}`,
        },
      },
    ],
    user: user_id,
  });
}

async function handleError({ channel_id, client, error, user_id }) {
  captureException(error);
  const text = translate(SOMETHING_WENT_WRONG);

  return client.chat.postEphemeral({
    channel: channel_id,
    text,
    user: user_id,
  });
}

async function handleCommand({ ack, client, command, say }) {
  try {
    await ack();

    const handlers = {
      activity: handleActivity,
      group: handleGroup,
      groups: handleGroups,
      question: handleQuestion,
    };

    const { channel_id, user_id, text } = command;
    const key = text.trim().toLowerCase();
    const handler = handlers[key] || handleUnknown;

    await handler({ channel_id, client, say, user_id });
  } catch (error) {
    captureException(error);
    const { channel_id, user_id } = command;
    handleError({ channel_id, client, error, user_id });
  }
}

module.exports = { handleCommand };
