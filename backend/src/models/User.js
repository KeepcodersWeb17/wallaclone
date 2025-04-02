import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    statics: {
      hashPassword: async function (clearPassword) {
        return await bcrypt.hash(clearPassword, 10);
      },
    },
    methods: {
      comparePassword: async function (clearPassword) {
        return await bcrypt.compare(clearPassword, this.password);
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
