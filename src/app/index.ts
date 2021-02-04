require('dotenv').config();

import { ACTIONS } from 'app/constants';
import { App } from '@slack/bolt';
import { captureException } from 'app/sentry';
import { createReceiver } from 'app/createReceiver';
import { handleAction } from 'app/handleAction';
import { handleAppHome } from 'app/handleAppHome';
import { handleCommand } from 'app/handleCommand';
import { handleMessage } from 'app/handleMessage';

const receiver = createReceiver(process.env.SLACK_SIGNING_SECRET);

const app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN,
});

app.event('app_home_opened', handleAppHome);
app.event('message', handleMessage);
app.command('/buddy', handleCommand);
ACTIONS.map((action) => app.action(action, handleAction));
app.error((error) => captureException(error));

module.exports = { app, receiver };
