import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String },
    password: { type: String, select: false },
  },
  {
    statics: {
      async signup(email, name, password) {
        if (!email || !name) {
          throw Error("All fields must be filled...");
        }
        const existingUser = await this.findOne({ email });

        if (existingUser) {
          throw Error("Email already in use...");
        }
        let hash;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          hash = await bcrypt.hash(password, salt);
        }
        const user = await this.create({
          email,
          password: hash,
          name,
        });
        return user;
      },
      async login(email, password) {
        if (!email || !password) {
          throw Error("All fields must be filled");
        }

        const user = await this.findOne({ email }).select("+password");
        console.log(user);

        if (!user) {
          throw Error("No user");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          throw Error("Incorrect password");
        }

        return user;
      },
    },
  }
);

export default mongoose.model("User", userSchema);
