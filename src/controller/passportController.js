import passport from "passport";
import LocalStrategy from "passport-local";
import { handleUserLogin } from "../service/loginService.js";
export const configPassport = () => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, cb) => {
        try {
          // console.log("username: " + username, "password: " + password);
          const rawData = {
            email: username,
            password: password,
          };
          const user = await handleUserLogin(rawData);
          //   console.log(user)
          if (user && +user.EC === 0) {
            return cb(null, user);
          } else {
            return cb(null, false, req.flash("message", [user.EM, username]));
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};
export const handleLogout = (req, res, next) => {
  //   req.logout();
  //   res.redirect("/api/login");

  req.session.destroy(function (err) {
    req.logout();
    res.redirect("/api/");
  });
};
