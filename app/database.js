const { MongoClient } = require("mongodb");
const { INTEGER_SETTINGS } = require("./constants");

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});

client.connect();

function getLatestGroups(amount = 1) {
  return new Promise(async (resolve, reject) => {
    try {
      const createdAts = await client
        .db(process.env.MONGO_DB_NAME)
        .collection("groups")
        .find({}, { limit: 200, sort: { createdAt: -1 } })
        .toArray();

      const uniqueCreatedAts = [
        ...new Set(createdAts.map(({ createdAt }) => createdAt)),
      ];

      const latestUniqueCreatedAts = uniqueCreatedAts.slice(0, amount);

      const groups = await client
        .db(process.env.MONGO_DB_NAME)
        .collection("groups")
        .find(
          { createdAt: { $in: latestUniqueCreatedAts } },
          { sort: { createdAt: 1 } }
        )
        .toArray();

      resolve(groups);
    } catch (error) {
      reject(error);
    }
  });
}

function getGroupForMember(member) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client
        .db(process.env.MONGO_DB_NAME)
        .collection("groups")
        .findOne({ members: member }, { limit: 1, sort: { createdAt: -1 } });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

function addGroupsToDatabase(createdAt, groupsWithChannels) {
  return new Promise(async (resolve, reject) => {
    try {
      const formattedGroups = groupsWithChannels.map(
        ({ channel, members }) => ({
          channel,
          createdAt,
          members,
        })
      );

      await client
        .db(process.env.MONGO_DB_NAME)
        .collection("groups")
        .insertMany(formattedGroups);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getSettings() {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client
        .db(process.env.MONGO_DB_NAME)
        .collection("settings")
        .find()
        .toArray();

      const settings = result.reduce(
        (acc, { key, value }) => ({
          ...acc,
          [key]: INTEGER_SETTINGS.indexOf(key) > -1 ? parseInt(value) : value,
        }),
        {}
      );

      resolve(settings);
    } catch (error) {
      reject(error);
    }
  });
}

function updateSettingInDatabase(key, value) {
  return new Promise(async (resolve, reject) => {
    try {
      await client
        .db(process.env.MONGO_DB_NAME)
        .collection("settings")
        .replaceOne({ key }, { key, value }, { upsert: true });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  addGroupsToDatabase,
  getGroupForMember,
  getLatestGroups,
  getSettings,
  updateSettingInDatabase,
};
