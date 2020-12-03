const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { INTEGER_SETTINGS } = require("./constants");

const dbPath = path.resolve(
  process.cwd(),
  `${process.env.DATABASE_FILE_NAME}.sqlite3`
);
const db = new sqlite3.Database(dbPath);

function getLatestGroups(amount = 1) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      createTablesIfNotExists();

      // Note: this gets a max of 200, could be a problem if an organisation has more than 400 members.
      db.all(
        `SELECT createdAt FROM groups ORDER BY createdAt DESC LIMIT 200`,
        (err, rows) => {
          if (err) return reject(err);

          const uniqueCreatedAts = [
            ...new Set(rows.map(({ createdAt }) => createdAt)),
          ];

          const latestUniqueCreatedAts = uniqueCreatedAts.slice(
            uniqueCreatedAts.length - amount,
            uniqueCreatedAts.length
          );

          const whereQuery =
            latestUniqueCreatedAts.length > 0
              ? `WHERE ${latestUniqueCreatedAts
                  .map((value) => `createdAt == '${value}'`)
                  .join(" OR ")}`
              : "";

          db.all(
            `SELECT * FROM groups ${whereQuery} ORDER BY createdAt DESC`,
            (err, rows) => {
              if (err) return reject(err);
              resolve(
                rows.map(({ id, createdAt, members }) => ({
                  id,
                  createdAt,
                  members: members.split(","),
                }))
              );
            }
          );
        }
      );
    });
  });
}

function getGroupForMember(member) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      createTablesIfNotExists();

      db.get(
        `SELECT * FROM groups WHERE members LIKE '%${member}%' ORDER BY createdAt DESC LIMIT 1`,
        (err, row) => {
          if (err) return reject(err);
          resolve({
            ...row,
            members: row.members.split(","),
          });
        }
      );
    });
  });
}

function addGroupsToDatabase(date, groupsWithChannels) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      createTablesIfNotExists();

      db.run(
        `INSERT INTO groups (
        createdAt,
        members,
        channel
      ) VALUES ${groupsWithChannels.map(
        ({ channel, members }) =>
          `('${date}', '${members.join(",")}', '${channel}')`
      )}`,
        [],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  });
}

function getSettings() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      createTablesIfNotExists();

      // Note: this gets a max of 200, could be a problem if an organisation has more than 400 members.
      db.all(`SELECT * FROM settings`, (err, rows) => {
        if (err) return reject(err);
        resolve(
          rows.reduce(
            (acc, cur) => ({
              ...acc,
              [cur.key]:
                INTEGER_SETTINGS.indexOf(cur.key) > -1
                  ? parseInt(cur.value)
                  : cur.value,
            }),
            {}
          )
        );
      });
    });
  });
}

function updateSettingInDatabase(key, value) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      createTablesIfNotExists();

      db.run(
        `REPLACE INTO settings (
        key,
        value
      ) VALUES (
        '${key}',
        '${value}'
      )`,
        [],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  });
}

function createTablesIfNotExists() {
  db.run(`CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY,
    createdAt TEXT NOT NULL,
    members TEXT NOT NULL,
    channel TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  )`);
}

module.exports = {
  addGroupsToDatabase,
  getGroupForMember,
  getLatestGroups,
  getSettings,
  updateSettingInDatabase,
};
