const {
  verifySignatureAndParseRawBody,
  respondToSslCheck,
  respondToUrlVerification,
} = require("@slack/bolt/dist/ExpressReceiver");
const { ExpressReceiver } = require("@slack/bolt");

exports.createReceiver = function (signingSecret) {
  const receiver = new ExpressReceiver({
    signingSecret,
  });

  // Disable start and stop to prevent it starting an express server
  receiver.start = () => {};
  receiver.stop = () => {};

  receiver.handleRequest = async (req, res, next) => {
    let ackCalled = false;

    if (req.body && req.body.ssl_check) {
      return respondToSslCheck(req, res, next);
    }

    if (req.body && req.body.type && req.body.type === "url_verification") {
      return respondToUrlVerification(req, res, next);
    }

    await verifySignatureAndParseRawBody(req, null, (error) => {
      if (error) {
        console.error(error); // @TODO: sentry
      }
    });

    const event = {
      body: req.body,
      ack: (response) => {
        if (ackCalled) {
          return;
        }

        if (response instanceof Error) {
          res.status(500).send();
        } else if (!response) {
          res.send("");
        } else {
          res.send(response);
        }

        ackCalled = true;
      },
    };

    await receiver.bolt.processEvent(event);
  };

  return receiver;
};
