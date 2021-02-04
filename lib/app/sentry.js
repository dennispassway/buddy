"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureException = void 0;
var Sentry = require("@sentry/node");
if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
}
var captureException = function (e) {
    console.error(e);
    if (process.env.SENTRY_DSN) {
        Sentry.captureException(e);
    }
};
exports.captureException = captureException;
