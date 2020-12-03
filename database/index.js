const mongodb = require("./mongodb");
const sqlite = require("./sqlite");

if (!process.env.DATABASE_TYPE || process.env.DATABASE_TYPE === "sqlite") {
  module.exports = sqlite;
}

if (process.env.DATABASE_TYPE === "mongodb") {
  module.exports = mongodb;
}
