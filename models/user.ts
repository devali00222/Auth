import mongoose, { Schema, model } from "mongoose";
import { Role, UserData } from "../interfaces/user";

const User = new Schema<UserData>({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    enum: Role,
    default: Role.NORMAL_USER_ROLE,
    required: [true, "Role is required"],
  },
  isValidate: {
    type: Boolean,
    default: false,
    required: [true, "Validate Attribute is required"],
  },
  img: String,
  isDeleted: { type: Boolean },
});
export const UserModel = model("User", User);
