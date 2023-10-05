export const isLogin = (req, res, next) => {
  //   console.log(req.path);
  if (req.isAuthenticated()) {
    if (req.path === "/login") {
      res.redirect("/api/");
    } else {
      next();
    }
  } else {
    if (req.path === "/login") {
      next();
    } else {
      res.redirect("/api/login");
    }
  }
};
