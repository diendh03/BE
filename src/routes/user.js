import express from "express";
import { getLoginPage } from "../controller/loginController.js";
import { signIn, signUp } from "../controller/user.js";
import { isLogin } from "../middleware/checkUser.js";
import { getHomePageController } from "../controller/homePageController.js";
import passport from "passport";
import { handleLogout } from "../controller/passportController.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/login", isLogin, getLoginPage);
router.get("/", isLogin, getHomePageController);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/",
    failureRedirect: "/api/login",
  })
);
router.post("/logout", handleLogout);

export default router;
