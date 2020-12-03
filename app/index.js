require("dotenv").config();

const { ACTIONS } = require("./constants");
const { App } = require("@slack/bolt");
const { createReceiver } = require("./createReceiver");
const { handleAction } = require("./handleAction");
const { handleAppHome } = require("./handleAppHome");
const { handleCommand } = require("./handleCommand");
const { handleMessage } = require("./handleMessage");

const receiver = createReceiver(process.env.SLACK_SIGNING_SECRET);

const app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN,
});

app.event("app_home_opened", handleAppHome);
app.event("message", handleMessage);
app.command("/buddy", handleCommand);
ACTIONS.map((action) => app.action(action, handleAction));
app.error((error) => console.error(error)); /* @TODO: sentry */

module.exports = { app, receiver };
