import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;

  // check json web token exists & verified
  if (token) {
    jwt.verify(token, "javohir12EpicReactDev98", (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.redirect("/login");
      }
      console.log(decodedToken);
      return next();
    });
  }
  res.redirect("/login");
};

// check current user
export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "javohir12EpicReactDev98", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
