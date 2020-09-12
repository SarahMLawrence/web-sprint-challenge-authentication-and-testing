const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const session = require("express-session");
const cookieParser = require("cookie-parser")

// const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser())
// server.use(
//   session({
//     resave: false, // avoid recreating sessions that have not changed
//     saveUninitialized: false, // comply with GDPR laws for setting cookies automatically
//     secret: "keep it secret, keep it safe", // cryptographically sign the cookie
//   }))


server.use("/api/auth", authRouter);
server.use("/api/jokes", jokesRouter);

server.get("/", (req, res) => {
    res.json({
      message: "Welcome to the Jokes API",
    });
  });

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});
module.exports = server;
