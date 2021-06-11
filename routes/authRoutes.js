import express from "express";
import {
  login_get,
  login_post,
  logout_get,
  signup_get,
  signup_post,
} from "../controllers/authController.js";

// router
const router = express.Router();
// get requests
router.get("/signup", signup_get);
router.get("/login", login_get);

// post requests
router.post("/signup", signup_post);
router.post("/login", login_post);
router.get("/logout", logout_get);

export default router;
