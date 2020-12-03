const {
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

  receiver.handleRequest = async (req, res) => {
    let ackCalled = false;

    if (req.body && req.body.ssl_check) {
      return respondToSslCheck(req, res);
    }

    if (req.body && req.body.type && req.body.type === "url_verification") {
      return respondToUrlVerification(req, res);
    }

    if (!req.body || !req.body.type) {
      return res.status(400).send("Missing event type");
    }

    const event = {
      body: req.body || {},
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
