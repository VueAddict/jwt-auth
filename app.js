// const express = require('express');
// const mongoose = require('mongoose');
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import { checkUser, requireAuth } from "./middleware/authMiddleware.js";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://zed12:zedReact98@cluster0.sj1me.mongodb.net/storiesDB?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// // cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=Abramov");
//   // res.cookie("framework", "react", { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });

//   res.send("You got the cookies");
// });
// app.get("/read-cookies", (req, res) => {
//   res.json(req.cookies);
// });
