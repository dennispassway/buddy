const { SETTING_REGENERATE } = require("./constants");
const { ExpressReceiver } = require("@slack/bolt");
const {
  respondToSslCheck,
  respondToUrlVerification,
} = require("@slack/bolt/dist/ExpressReceiver");

exports.createReceiver = function (signingSecret) {
  const receiver = new ExpressReceiver({
    signingSecret,
  });

  // Disable start and stop to prevent it starting an express server
  receiver.start = () => {};
  receiver.stop = () => {};

  receiver.handleRequest = async (req, res) => {
    let ackCalled = false;

    if (req.body && req.body.ssl_check) {
      return respondToSslCheck(req, res);
    }

    if (req.body && req.body.type && req.body.type === "url_verification") {
      return respondToUrlVerification(req, res);
    }

    if (req.body.payload) {
      req.body = JSON.parse(req.body.payload);
    }

    const event = {
      body: req.body || {},
      ack: (response) => {
        if (ackCalled) {
          return;
        }

        ackCalled = true;

        const { actions, event } = req.body || {};

        const isMessage = (event || {}).type === "message";
        const isRegenerateAction =
          actions &&
          actions.length &&
          actions.findIndex(
            ({ action_id }) => action_id === SETTING_REGENERATE
          ) !== -1;

        const timeout = isMessage || isRegenerateAction ? 5000 : 1500;

        /*
          Some action take longer than Slack accepts so the response is in a
          timeout to prevent the http connection from closing before the action
          is done. This could result in operation_timed_out messages.
        */
        setTimeout(() => {
          if (response instanceof Error) {
            res.status(500).send();
          } else if (!response) {
            res.status(200).send("");
          } else {
            res.status(200).send(response);
          }
        }, timeout);
      },
    };

    await receiver.bolt.processEvent(event);
  };

  return receiver;
};
