import express from "express";

let configViewEngine = (app) => {
  app.set("views", "./src/views");
  app.set("view engine", "ejs");
  app.use(express.static("./src/public"));
};

export default configViewEngine;
