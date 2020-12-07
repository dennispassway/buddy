# 🐶 Buddy
Your best pal in Slack, helping you and your coworkers to be buddies.

## .env
For development you can set up a `.env` file that should be hosted at the root of the project.
These environment variables should be set up at your hosting provider.

```
ADMIN_USERS=
DISABLE_USER_NOTIFICATION=
MONGO_DB_NAME=
MONGO_URI=
SENTRY_DSN=
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
```

## Settingg up your bot in Slack
Make sure interactivity, slash commands and events are activated and all point to /api/slack.

Add the following permission scopes:
```
app_mentions:read
channels:history
channels:manage
chat:write
groups:history
groups:write
im:history
im:write
mpim:history
mpim:write
users:read
```