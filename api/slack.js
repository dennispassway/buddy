const { receiver } = require("../app");

module.exports = (req, res, next) => {
  console.log(req.body);
  receiver.handleRequest(req, res, next);
};
