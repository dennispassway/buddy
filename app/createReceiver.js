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

        if (response instanceof Error) {
          res.status(500).send();
        } else if (!response) {
          res.status(200).write("");
        } else {
          res.status(200).write(response);
        }

        ackCalled = true;

        /*
          In a timeout to prevent the http connection from closing.
          Set this to your expected maximum process time to keep the
          function alive till it's done.
        */
        setTimeout(
          () => res.end(),
          process.env.KEEP_FUNCTION_ALIVE_FOR || 2000
        );
      },
    };

    await receiver.bolt.processEvent(event);
  };

  return receiver;
};
