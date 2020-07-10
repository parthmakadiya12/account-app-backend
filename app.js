import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import auth from "./routes/auth";
import { connect } from "./db/db";

const app = express();
const PORT = process.env.PORT || 8080;
const dev_db_url = "mongodb://localhost:27017/accountApp";
const mongoDbUrl = process.env.MONGODB_URI || dev_db_url;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(`/`, auth);

const server = app.listen(PORT);
connect(mongoDbUrl, err => {
    if (err) {
      logger.info(`Unable to connect to Mongo : ${err}`);
      process.exit(1);
    } else {
      logger.info("Connected To MongoDB");
    }
  });

export default server;