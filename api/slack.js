const { receiver } = require("../app");

module.exports = (req, res) => {
  console.log(req.body);
  receiver.handleRequest(req, res);
};
