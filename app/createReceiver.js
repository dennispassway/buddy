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

        // We're delaying closing the http response because @slack/bolt auto-acks certain events, which will close the http request and subsequently
        setTimeout(() => {
          if (response instanceof Error) {
            res.status(500).send();
          }

          res.send(!response ? "" : response);
          ackCalled = true;
        }, 2000);
      },
    };

    await receiver.bolt.processEvent(event);
  };

  return receiver;
};
