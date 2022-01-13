const express = require("express");
const app = express();
const next = require("next");
const server = require("http").Server(app);
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const PORT = process.env.NODE_ENV || 3000;
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./utilsServer/connectDb");
connectDB();
app.use(express.json());

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// const express = require("express");
// const next = require("next");

// const port = parseInt(process.env.PORT, 10) || 3000;
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// require("dotenv").config({ path: "./config.env" });
// const connectDB = require("./utilsServer/connectDb");
// connectDB();
// app.prepare().then(() => {
//   const server = express();
//   app.use("/api/signup", require("./api/signup"));
//   app.use("/api/auth", require("./api/auth"));

//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });
