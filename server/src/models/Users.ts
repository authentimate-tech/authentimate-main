import mongoose, { Schema, Document } from "mongoose";
import { refreshToken } from "../controllers/auth/auth";

export interface IUser extends Document {
  email: string;
  password: string;
  refreshToken: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
