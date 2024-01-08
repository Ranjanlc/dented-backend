import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  getUser,
  loginUser,
  signupUser,
  updateuserInfo,
  refreshToken,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/", requireAuth, updateuserInfo);

// signup route
router.post("/signup", signupUser);

// verify user

// login route
router.post("/login", loginUser);

//get user by id to view profile
router.get("/", requireAuth, getUser);

router.get("/refresh-token", requireAuth, refreshToken);

// Change pw

export default router;
