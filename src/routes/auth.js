import path from "path"; // has path and __dirname
import express from "express";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { getAuthorizationCode } from "../oauth/model";
const router = express.Router();
const encodedToken = (userID) => {
  return jwt.sign(
    {
      iss: "Do Huu Dien",
      sub: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.JWT_SECRET
  );
};
// const filePath = path.join(__dirname, "../public/oauthAuthenticate.html");

router.get("/", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dirname = path.dirname(__dirname);
  //   console.log(path.join(dirname, "/public", "oauthAuthenticate.html"));
  res.sendFile(path.join(dirname, "/public", "oauthAuthenticate.html"));
});
router.post("/authorize", async (req, res) => {
  const { username, password } = req.body;
  const client = {
    clientId: req.body.client_id,
    clientSecret: req.body.client_secret,
  };
  const user = await User.findOne({ email: username });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.status(404).json({ message: "Mật khẩu không chính xác" });
  }
  const token = encodedToken(user._id);
  const userID = user;
  //   console.log(token);
  const result = await getAuthorizationCode(token, client, userID);
  //   document.cookie = result;
  res.redirect(`${req.body.redirect_uri + `?data=${result}`}`);
});

export default router;
