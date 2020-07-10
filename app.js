import bodyParser from "body-parser";
import express from "express";

import userRoute from "./routes/index";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.text({ type: 'text/*' }));

app.use(`/`, userRoute);

const server = app.listen(PORT);
export default server;