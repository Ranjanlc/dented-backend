import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncWrapper from "../utils/asyncWrapper.js";
const requireAuth = asyncWrapper(async (req, _, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Authorization token required", 511);
  }

  const token = authorization.split(" ")[1];

  try {
    if (!token) throw new Error("No token");
    const _id = jwt.verify(token, process.env.SECRET || "")._id;
    const user = await User.findById(_id);
    req.body.userId = user._id;

    next();
    return;
  } catch (error) {
    // console.log(error);
    throw new Error("Request is not authorized", 403);
  }
});

export default requireAuth;
