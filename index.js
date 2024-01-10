import express, { json } from "express";
require("dotenv").config();
import { createHandler } from "graphql-http/lib/use/express";
import colors from "colors";
import cors from "cors";

const app = express();

import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
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
app.use(json());

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

app.use("/graphql", createHandler({ schema }));

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
