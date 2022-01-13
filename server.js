// const app = require("express");
const express = require("express");
const app = express();
var next = require("next");
const bodyParser = require("body-parser");
const logger = require("morgan");
const server = require("http").Server(app);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./utilsServer/connectDb");
const PORT = 3000;

app.use(express.json()); // this is the body parser
app.use(logger("dev"));
app.use(bodyParser.json());
connectDB();

nextApp.prepare().then(() => {
  app.call("*", (req, res) => handle(req, res));

  server.listen(PORT, () =>
    console.log(`The server is running on port ${PORT}`)
  );
});
