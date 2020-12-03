const glob = require("glob");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

glob.sync("./api/**/*.js").forEach((file) => {
  const handler = require(path.resolve(file));
  const url = file.replace(".js", "").replace("./", "/");
  app.get(url, handler);
  app.post(url, handler);
  app.put(url, handler);
  app.delete(url, handler);
});

app.listen(port, () =>
  console.log(`Dev server listening at http://localhost:${port}`)
);
