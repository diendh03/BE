import express from "express";
import { getHomePageController } from "../controller/homePageController.js";
import { isLogin } from "../middleware/checkUser.js";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", isLogin, getHomePageController);
  return app.use("/", router);
};

export default initWebRoutes;
