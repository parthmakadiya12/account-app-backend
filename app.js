import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import path from "path";

import auth from "./routes/auth";
import invoice from "./routes/invoice";
import { connect } from "./db/db";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
const PORT = process.env.PORT || 8080;
const dev_db_url = "mongodb://localhost:27017/accountApp";
const mongoDbUrl = process.env.MONGOURL || dev_db_url;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use('/', express.static(__dirname + '/build'));

app.use(`/api/auth`, auth);
app.use(`/api/invoices`, authMiddleware, invoice);

app.use('/*', express.static(path.join(__dirname, '/build')));

const server = app.listen(PORT);
connect(mongoDbUrl, (err) => {
  if (err) {
    console.log(`Unable to connect to Mongo : ${err}`);
    process.exit(1);
  } else {
    console.log("Connected To MongoDB");
  }
});

export default server;
