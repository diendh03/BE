import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
export const encodedToken = (user) => {
  return jwt.sign(
    {
      iss: "Do Huu Dien",
      sub: user,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.JWT_SECRET
  );
};

export const handleUserLogin = async (rawData) => {
  try {
    // console.log(rawData);
    const user = await User.findOne({ email: rawData.email });
    // console.log(user);
    if (user) {
      const isCorrectPassword = await bcrypt.compare(
        rawData.password,
        user.password
      );
      if (isCorrectPassword === true) {
        const token = encodedToken(user);
        return {
          EM: "Ok!",
          EC: 0,
          DT: {
            access_token: token,
            user,
          },
        };
      }
      return {
        EM: "Password incorrect",
        EC: 1,
        DT: {},
      };
    }
    return {
      EM: "Your email is incorrect",
      EC: 1,
      DT: {},
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
    };
  }
};
