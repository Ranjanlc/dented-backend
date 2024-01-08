import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  getUser,
  loginUser,
  signupUser,
  updateuserInfo,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/", requireAuth, updateuserInfo);

// signup route
router.post("/signup", signupUser);

// verify user
// router.patch("/verify", verifyUser);

// login route
router.post("/login", loginUser);

//get user by id to view profile
router.get("/", requireAuth, getUser);

// Change pw

export default router;