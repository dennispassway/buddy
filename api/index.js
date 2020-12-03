require("dotenv").config();

const { ACTIONS } = require("./constants");
const { App } = require("@slack/bolt");
const { handleAction } = require("./handleAction");
const { handleAppHome } = require("./handleAppHome");
const { handleCommand } = require("./handleCommand");
const { handleMessage } = require("./handleMessage");

const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

slackApp.event("app_home_opened", handleAppHome);
slackApp.event("message", handleMessage);
slackApp.command("/buddy", handleCommand);
ACTIONS.map((action) => slackApp.action(action, handleAction));
slackApp.error((error) => console.error(error)); /* @TODO: sentry */

(async () => {
  try {
    const port = process.env.PORT || 8000;
    await slackApp.start(port);
    console.log(`🐶 Buddy is listening and watching door ${port}!`);
  } catch (e) {
    console.error(e); /* @TODO: sentry */
  }
})();
