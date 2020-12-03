if (!process.env.DATABASE_TYPE || process.env.DATABASE_TYPE === "sqlite") {
  module.exports = require("./sqlite");
}

if (process.env.DATABASE_TYPE === "mongodb") {
  module.exports = require("./mongodb");
}
