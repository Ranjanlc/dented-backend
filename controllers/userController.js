import mongoose from "mongoose";
import asyncWrapper from "../utils/asyncWrapper.js";
import User from "../models/User.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET || "", {
    expiresIn: "15m",
  });
};

const initSignupUser = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const user = await User.signup(email, fullName, password);
    console.log("User after signup:", user);
    const token = createToken(user._id);
    res.status(200).json({ user, message: "Signed up successfully", token });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, 403);
    }
  }
};

//   try {
//     console.log(req.body);
//     const { id } = req.body;
//     console.log(id);
//     const verifiedUser = await User.findByIdAndUpdate(id, {
//       emailVerified: true,
//     });
//     if (!verifiedUser) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     console.log(verifiedUser);
//     return res.status(201).json({ message: "User is verified" });
//   } catch (err) {
//     throw new CustomError("Can't verify", 500);
//   }
// };

//login user
const initLoginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    // Determine whether the user is remembered or not
    const token = createToken(user._id, rememberMe);

    res.status(200).json({ email, token });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, 403);
    }
  }
};

const initGetUser = async (req, res) => {
  const { userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new CustomError(`invalid user id`, 403);
  }
  try {
    console.log(userId);
    const foundUser = await User.findById(userId);
    console.log(foundUser);
    return res.status(200).json({ user: foundUser });
  } catch (err) {
    console.log(err);
    throw new Error("invalid", 404);
  }
};

const initUpdateuserInfo = async (req, res) => {
  const { userId } = req.body;

  const { firstname, lastname, email, phone, description, socialMedia } =
    req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(`No info with infouserId: ${userId}`);
  }
  try {
    const updateduserInfo = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        email,
        phone,
        description,
        socialMedia: JSON.parse(socialMedia),
        profileImage:
          req.files && files.profileImage
            ? `/images/${files.profileImage[0].filename}`
            : undefined,
        coverImage:
          req.files && files.coverImage
            ? `/images/${files.coverImage[0].filename}`
            : undefined,
      },
      {
        new: true,
      }
    );
    return res.json({ updateduserInfo });
  } catch (error) {
    return res.status(500).json({ error: "error.message" });
  }
};

export const signupUser = asyncWrapper(initSignupUser);
export const loginUser = asyncWrapper(initLoginUser);
export const getUser = asyncWrapper(initGetUser);
export const updateuserInfo = asyncWrapper(initUpdateuserInfo);

// export const verifyUser = asyncWrapper(initVerifyUser);