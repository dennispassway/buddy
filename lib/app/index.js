"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var constants_1 = require("app/constants");
var bolt_1 = require("@slack/bolt");
var sentry_1 = require("app/sentry");
var createReceiver_1 = require("app/createReceiver");
var handleAction_1 = require("app/handleAction");
var handleAppHome_1 = require("app/handleAppHome");
var handleCommand_1 = require("app/handleCommand");
var handleMessage_1 = require("app/handleMessage");
var receiver = createReceiver_1.createReceiver(process.env.SLACK_SIGNING_SECRET);
var app = new bolt_1.App({
    receiver: receiver,
    token: process.env.SLACK_BOT_TOKEN,
});
app.event('app_home_opened', handleAppHome_1.handleAppHome);
app.event('message', handleMessage_1.handleMessage);
app.command('/buddy', handleCommand_1.handleCommand);
constants_1.ACTIONS.map(function (action) { return app.action(action, handleAction_1.handleAction); });
app.error(function (error) { return sentry_1.captureException(error); });
module.exports = { app: app, receiver: receiver };
