const express = require("express");
require("dotenv").config();
const { createHandler } = require("graphql-http/lib/use/express");
const colors = require("colors");
const cors = require("cors");

const app = express();

const schema = require("./schema/schema.js");
const connectDB = require("./config/db.js");
const port = process.env.PORT || 8080;
// const developmentEnv =
//   process.env.NODE_ENV === "dev" && "http://localhost:3000";

// const origin = [
//   process.env.CLIENT_URL,
//   process.env.CLIENT_URL_WEB,
//   "http://localhost:3000",
// ];

// const corsOptions = {
//   origin: origin,
// };
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL_WEB,
      "http://localhost:3000",
    ],
  })
);
app.use(express.json());

// ignore favicon.ico request
app.get("/favicon.ico", (req, res, next) => {
  res.status(204);
  next();
});

// connectDB();
app.get("/", (req, res, next) => {
  res.send("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Hello world, I am a server!");
  next();
});

app.all("/graphql", createHandler({ schema }));

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
