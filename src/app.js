import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/user";
import oAuthRouter from "./routes/auth";
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/oauth", oAuthRouter);
mongoose.connect(`mongodb://127.0.0.1:27017/game1`);

export const viteNodeApp = app;
