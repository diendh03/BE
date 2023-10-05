import session from "express-session";
// import MongoDBStore from "connect-mongodb-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import passport from "passport";
const configSession = (app) => {
  const MongoDBStore = connectMongoDBSession(session);
  var store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017/game1",
  });

  // Catch errors
  store.on("error", function (error) {
    console.log(error);
  });

  app.use(
    session({
      secret: "secret",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
      expires: 1000 * 60 * 60 * 24,
      store: store,
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(passport.authenticate("session"));
  passport.serializeUser(function (user, cb) {
    // console.log("before" + user);
    process.nextTick(function () {
      cb(null, user);
    });
  });
  passport.deserializeUser(function (user, cb) {
    // console.log("after" + user);
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
export default configSession;
