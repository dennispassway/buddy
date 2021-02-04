import * as Sentry from '@sentry/node';

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

export const captureException = (e: any) => {
  console.error(e);

  if (process.env.SENTRY_DSN) {
    Sentry.captureException(e);
  }
};
