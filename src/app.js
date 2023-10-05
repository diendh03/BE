import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/user.js";

import viewEngin from "./config/viewEngine.js";
import { configPassport } from "./controller/passportController.js";
import cookieParser from "cookie-parser";
import passport from "passport";

import configSession from "./config/session.js";
import flash from "connect-flash";
const app = express();

viewEngin(app);
app.use(express.json());
app.use(cors());
app.use(flash());

app.use(cookieParser("secret"));
configSession(app);
configPassport();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//cofig flash

// Config passport middleware
app.use(passport.initialize());
// app.use(passport.session());

app.use("/api", authRouter);

// initWebRoutes(app);
mongoose.connect(`mongodb://127.0.0.1:27017/game1`);

let port = 8080;
app.listen(port, () => {
  console.log(`App is running at the ${port}`);
});
export const viteNodeApp = app;
