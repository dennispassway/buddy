const Sentry = require("@sentry/node");

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const captureException = (e) => {
  console.error(e);

  if (process.env.SENTRY_DSN) {
    Sentry.captureException(e);
  }
};

module.exports = { captureException };
