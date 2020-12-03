const sqlite = require("./sqlite");

if (!process.env.DATABASE_TYPE || process.env.DATABASE_TYPE === "sqlite") {
  module.exports = sqlite;
}
