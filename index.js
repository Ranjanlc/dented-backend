import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
const port = process.env.PORT || 4000;
// consol.log(prcess.env.MONGO_URI, "Hiiiiiiiii");
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    app.listen(port, async () => {
      console.log("connected to db & listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
