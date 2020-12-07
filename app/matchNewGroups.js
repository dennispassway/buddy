const {
  addGroupsToDatabase,
  getLatestGroups,
  getSettings,
} = require("../database");
const {
  GREETINGS,
  translate,
  WEEK,
  YOU_ARE_BUDDIES_FOR,
} = require("./translate");
const {
  DEFAULT_SETTINGS,
  LATEST_GROUPS_AMOUNT,
  MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP,
  SETTING_BUDDY_GROUP_SIZE,
  SETTING_USERS_TO_IGNORE,
} = require("./constants");
const { randomFromArray, shuffleArray } = require("./utils");

let timesTriedToCreateNewGroup = 0;

async function matchNewGroups(client) {
  const settings = await getSettings();
  const buddyGroupSize =
    settings[SETTING_BUDDY_GROUP_SIZE] ||
    DEFAULT_SETTINGS[SETTING_BUDDY_GROUP_SIZE];
  const usersToIgnore =
    settings[SETTING_USERS_TO_IGNORE] ||
    DEFAULT_SETTINGS[SETTING_USERS_TO_IGNORE];

  // Get N latest groups and active members to create new, uniquer groups
  const latestGroups = await getLatestGroups(LATEST_GROUPS_AMOUNT);
  const activeMembers = await fetchActiveMembers({ client, usersToIgnore });
  const groups = await createGroupsForMembers(
    activeMembers,
    latestGroups,
    buddyGroupSize
  );

  // Open channels for groups
  const groupsWithChannels = await openChannelsForGroups({ client, groups });
  console.log(`New Channels opened for groups.`);

  // Save groups to database.
  await addGroupsToDatabase(new Date().toUTCString(), groupsWithChannels);
  console.log(`${groups.length} groups saved to database.`);

  // Notify everyone of their new group
  await Promise.all(groupsWithChannels.map(welcomeMembersToGroup));

  // Done
  console.log(`${groups.length} new groups notified.`);
}

async function openChannelsForGroups({ client, groups }) {
  return await Promise.all(
    groups.map(async (group) => {
      const { channel } = await client.conversations.open({
        token: process.env.SLACK_BOT_TOKEN,
        users: group.join(","),
      });

      return { members: group, channel: channel.id };
    })
  );
}

async function welcomeMembersToGroup({ channel, members }) {
  if (process.env.DISABLE_USER_NOTIFICATION === "true") {
    console.log(`Users not notified, DISABLE_USER_NOTIFICATION is enabled.`);
    return Promise.resolve();
  }

  const buddiesString = members.map((buddy) => `<@${buddy}>`).join(", ");

  const text = `${randomFromArray(
    translate(GREETINGS)
  )} ${buddiesString}. ${translate(YOU_ARE_BUDDIES_FOR)} ${translate(
    WEEK
  )}! :tada:`;

  return client.chat.postMessage({
    channel,
    token: process.env.SLACK_BOT_TOKEN,
    text,
  });
}

async function fetchActiveMembers({ client, usersToIgnore }) {
  const { members } = await client.users.list({
    token: process.env.SLACK_BOT_TOKEN,
  });

  return members
    .filter(
      ({ deleted, is_bot, id }) =>
        !deleted &&
        !is_bot &&
        id !== "USLACKBOT" &&
        usersToIgnore.indexOf(id) === -1
    )
    .map(({ id }) => id);
}

async function createGroupsForMembers(members, latestGroups, buddyGroupSize) {
  let newGroups = null;
  const shuffledMembers = shuffleArray(members);
  const isEven = shuffledMembers.length % 2 === 0;

  newGroups = shuffledMembers.reduce((acc, cur, index, source) => {
    const items = [...acc];
    const lastItem = items[items.length - 1] || [];

    if (!lastItem.length) {
      items.push(lastItem);
    }

    const isFinalMember = index === source.length - 1;

    if (lastItem.length < buddyGroupSize || (!isEven && isFinalMember)) {
      lastItem.push(cur);
    } else {
      items.push([cur]);
    }

    return items;
  }, []);

  if (latestGroups) {
    const sortedGroups = [...newGroups.map((group) => group.sort().join(","))];
    const sortedLatestGroupMembers = latestGroups.map(({ members }) =>
      members.sort().join(",")
    );

    const alreadyCreatedGroups = sortedGroups.filter(
      (group) => sortedLatestGroupMembers.indexOf(group) !== -1
    );

    if (
      alreadyCreatedGroups.length &&
      timesTriedToCreateNewGroup < MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP
    ) {
      timesTriedToCreateNewGroup++;
      return createGroupsForMembers(members, latestGroups, buddyGroupSize);
    }
  }

  if (timesTriedToCreateNewGroup >= MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP) {
    console.warn(
      `Could not fine a unique group after ${MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP} tries.`
    );
  }

  console.log(
    `Created new groups after ${timesTriedToCreateNewGroup}/${MAX_TIMES_TO_TRY_TO_CREATE_NEW_GROUP} tries to be unique.`
  );
  timesTriedToCreateNewGroup = 0;

  return newGroups;
}

module.exports = { matchNewGroups };
