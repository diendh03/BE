import User from "../models/user";
import { signUpSchema, signinSchema } from "../schema/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
export const encodedToken = (userID) => {
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

export const signUp = async (req, res) => {
  try {
    //validate đầu vào
    const { errors } = signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (errors) {
      const error = errors.details.map((err) => err.message);
      return res.status(400).json({
        message: error,
      });
    }

    //Kiem tra email da ton tai hay chua

    const isExistUser = await User.findOne({ email: req.body.email });
    if (isExistUser) {
      return res.status(400).json({
        message: " Tài khoản đã tồn tại",
      });
    }
    //Ma hoa mat khau
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    //Tạo user moi voi mat khau da ma hoa
    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });
    //Tra ve client với mật khẩu rỗng
    user.password = undefined;
    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(404).json({ message: "Mật khẩu không chính xác" });
    }
    const token = encodedToken(user._id);
    req.user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      data: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "ncc",
    });
  }
};
