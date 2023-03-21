import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./interfaces";

export type User = IUser & mongoose.Document;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", UserSchema, "users");
